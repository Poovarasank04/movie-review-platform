const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    tmdbMovieId: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    posterPath: {
      type: String,
      default: null
    },

    releaseDate: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

watchlistSchema.index(
  { user: 1, tmdbMovieId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "Watchlist",
  watchlistSchema
);