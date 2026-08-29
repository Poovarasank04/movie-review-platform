const express = require("express");

const {
  searchTMDBMovies,
  getTMDBMovie,
  getPopularTMDBMovies,
  discoverTMDBMovies,
  getTMDBMoviesByGenre,
  getTopRatedTMDBMovies
} = require("../controllers/tmdbController");

const router = express.Router();

router.get(
  "/search",
  searchTMDBMovies
);

router.get(
  "/popular",
  getPopularTMDBMovies
);

router.get(
  "/top-rated",
  getTopRatedTMDBMovies
);

router.get(
  "/discover",
  discoverTMDBMovies
);

router.get(
  "/genre/:genreId",
  getTMDBMoviesByGenre
);

router.get(
  "/:tmdbId",
  getTMDBMovie
);

module.exports = router;