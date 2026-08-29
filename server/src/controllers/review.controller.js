const Review = require("../models/Review");

const {
  getMovieDetails
} = require("../services/tmdbService");
// ==========================================
// CREATE TMDB REVIEW
// ==========================================

const createTMDBReview = async (req, res) => {
  try {
    const { tmdbMovieId } = req.params;
    const { rating, comment } = req.body;

    // 1. Validate input
    if (rating === undefined || !comment?.trim()) {
      return res.status(400).json({
        message: "Rating and comment are required"
      });
    }

    // 2. Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    // 3. Validate TMDB movie ID
    if (!tmdbMovieId || isNaN(tmdbMovieId)) {
      return res.status(400).json({
        message: "Invalid TMDB movie ID"
      });
    }

    // 4. Check if user already reviewed this TMDB movie
    const existingReview = await Review.findOne({
      user: req.user._id,
      tmdbMovieId: Number(tmdbMovieId)
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this movie"
      });
    }

    // 5. Create review
    const review = await Review.create({
      user: req.user._id,
      tmdbMovieId: Number(tmdbMovieId),
      rating: Number(rating),
      comment: comment.trim()
    });

    // 6. Populate user
    const populatedReview = await Review.findById(review._id)
      .populate("user", "name email");

    res.status(201).json({
      message: "Review created successfully",
      review: populatedReview
    });

  } catch (error) {
    console.error("Create TMDB review error:", error);

    res.status(500).json({
      message: "Failed to create review"
    });
  }
};


// ==========================================
// GET REVIEWS FOR TMDB MOVIE
// ==========================================

const getTMDBReviews = async (req, res) => {
  try {
    const { tmdbMovieId } = req.params;

    // Validate TMDB movie ID
    if (!tmdbMovieId || isNaN(tmdbMovieId)) {
      return res.status(400).json({
        message: "Invalid TMDB movie ID"
      });
    }

    const reviews = await Review.find({
      tmdbMovieId: Number(tmdbMovieId)
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      reviews.length > 0
        ? Number((totalRating / reviews.length).toFixed(1))
        : 0;

    res.status(200).json({
      tmdbMovieId: Number(tmdbMovieId),
      count: reviews.length,
      averageRating,
      reviews
    });

  } catch (error) {
    console.error("Get TMDB reviews error:", error);

    res.status(500).json({
      message: "Failed to load reviews"
    });
  }
};


// ==========================================
// UPDATE REVIEW
// ==========================================

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    // Ownership check
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only update your own review"
      });
    }

    // Validate rating if provided
    if (rating !== undefined) {

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: "Rating must be between 1 and 5"
        });
      }

      review.rating = Number(rating);
    }

    // Update comment
    if (comment !== undefined) {
      review.comment = comment.trim();
    }

    await review.save();

    const updatedReview = await Review.findById(
      review._id
    ).populate("user", "name email");

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview
    });

  } catch (error) {
    console.error("Update review error:", error);

    res.status(500).json({
      message: "Failed to update review"
    });
  }
};


// ==========================================
// DELETE REVIEW
// ==========================================

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found"
      });
    }

    // Ownership check
    if (
      review.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own review"
      });
    }

    await review.deleteOne();

    res.status(200).json({
      message: "Review deleted successfully"
    });

  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      message: "Failed to delete review"
    });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user._id
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const reviewsWithMovies = await Promise.all(
      reviews.map(async (review) => {
        try {
          const movie = await getMovieDetails(
            review.tmdbMovieId
          );

          return {
            ...review.toObject(),

            movie: {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date
            }
          };

        } catch (error) {
          console.error(
            `Failed to load TMDB movie ${review.tmdbMovieId}:`,
            error.message
          );

          return {
            ...review.toObject(),
            movie: null
          };
        }
      })
    );

    res.status(200).json({
      count: reviewsWithMovies.length,
      reviews: reviewsWithMovies
    });

  } catch (error) {
    console.error(
      "Get my reviews error:",
      error
    );

    res.status(500).json({
      message: "Failed to load your reviews"
    });
  }
};

module.exports = {
  createTMDBReview,
  getTMDBReviews,
  updateReview,
  deleteReview,
  getMyReviews
};