const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const reviewRoutes = require("./routes/review.routes");
const tmdbRoutes = require("./routes/tmdbRoutes");
const watchlistRoutes = require("./routes/watchlist.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "MovieHub API"
  });
});


app.get("/", (req, res) => {
  res.json({
    message: "Movie Review API is running"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();