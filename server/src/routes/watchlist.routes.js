const express = require("express");

const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} = require("../controllers/watchlist.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();


// GET USER WATCHLIST
router.get(
  "/",
  protect,
  getWatchlist
);


// ADD MOVIE
router.post(
  "/",
  protect,
  addToWatchlist
);


// REMOVE MOVIE
router.delete(
  "/:tmdbMovieId",
  protect,
  removeFromWatchlist
);


module.exports = router;