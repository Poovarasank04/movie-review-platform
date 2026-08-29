const express = require("express");

const {
  searchTMDBMovies,
  getTMDBMovie,
  getPopularTMDBMovies,
  getTMDBMoviesByGenre
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
  "/genre/:genreId",
  getTMDBMoviesByGenre
);

router.get(
  "/:tmdbId",
  getTMDBMovie
);

module.exports = router;