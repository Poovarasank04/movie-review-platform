const express = require("express");

const {
  createTMDBReview,
  getTMDBReviews,
  updateReview,
  deleteReview,
  getMyReviews
} = require("../controllers/review.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.get(
  "/me",
  protect,
  getMyReviews
);
// Get reviews for a TMDB movie
router.get(
  "/tmdb/:tmdbMovieId",
  getTMDBReviews
);


// Create review for a TMDB movie
router.post(
  "/tmdb/:tmdbMovieId",
  protect,
  createTMDBReview
);


// Update own review
router.put(
  "/:id",
  protect,
  updateReview
);


// Delete own review
router.delete(
  "/:id",
  protect,
  deleteReview
);


module.exports = router;