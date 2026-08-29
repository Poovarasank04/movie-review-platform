const Watchlist = require("../models/Watchlist");


// ADD TO WATCHLIST
const addToWatchlist = async (req, res) => {
  try {

    const {
      tmdbMovieId,
      title,
      posterPath,
      releaseDate
    } = req.body;

    if (!tmdbMovieId || !title) {
      return res.status(400).json({
        message: "Movie ID and title are required"
      });
    }

    const existingMovie =
      await Watchlist.findOne({
        user: req.user._id,
        tmdbMovieId: Number(tmdbMovieId)
      });

    if (existingMovie) {
      return res.status(409).json({
        message: "Movie already exists in your watchlist"
      });
    }

    const watchlistMovie =
      await Watchlist.create({
        user: req.user._id,
        tmdbMovieId: Number(tmdbMovieId),
        title: title.trim(),
        posterPath: posterPath || null,
        releaseDate: releaseDate || null
      });

    res.status(201).json({
      message: "Movie added to watchlist",
      movie: watchlistMovie
    });

  } catch (error) {

    console.error(
      "Add watchlist error:",
      error
    );

    res.status(500).json({
      message: "Failed to add movie to watchlist"
    });
  }
};


// GET USER WATCHLIST
const getWatchlist = async (req, res) => {
  try {

    const movies =
      await Watchlist.find({
        user: req.user._id
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: movies.length,
      movies
    });

  } catch (error) {

    console.error(
      "Get watchlist error:",
      error
    );

    res.status(500).json({
      message: "Failed to load watchlist"
    });
  }
};


// REMOVE FROM WATCHLIST
const removeFromWatchlist = async (req, res) => {
  try {

    const { tmdbMovieId } = req.params;

    const movie =
      await Watchlist.findOneAndDelete({
        user: req.user._id,
        tmdbMovieId: Number(tmdbMovieId)
      });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found in watchlist"
      });
    }

    res.status(200).json({
      message: "Movie removed from watchlist"
    });

  } catch (error) {

    console.error(
      "Remove watchlist error:",
      error
    );

    res.status(500).json({
      message: "Failed to remove movie"
    });
  }
};


module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
};