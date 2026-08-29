const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getMoviesByGenre
} = require("../services/tmdbService");

const searchTMDBMovies = async (req, res) => {
  try {
    const {
      query,
      page = 1
    } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const data = await searchMovies(
      query.trim(),
      page
    );

    res.json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      query: query.trim(),
      movies: data.results
    });

  } catch (error) {
    console.error(
      "TMDB search error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to search movies"
    });
  }
};


const getTMDBMovie = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const movie = await getMovieDetails(
      tmdbId
    );

    res.json({
      movie
    });

  } catch (error) {
    console.error(
      "TMDB movie error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to get movie details"
    });
  }
};

const getPopularTMDBMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const data = await getPopularMovies(page);

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      movies: data.results
    });

  } catch (error) {
    console.error(
      "TMDB popular movies error:",
      error
    );

    res.status(500).json({
      message: "Failed to load popular movies"
    });
  }
};

const getTMDBMoviesByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const page = Number(req.query.page) || 1;
    const sortBy = req.query.sortBy || "popularity.desc";
    
    if (!genreId || isNaN(genreId)) {
      return res.status(400).json({
        message: "Invalid genre ID"
      });
    }

    const allowedSorts = [
      "popularity.desc",
      "vote_average.desc",
      "primary_release_date.desc"
    ];

    if (!allowedSorts.includes(sortBy)) {
      return res.status(400).json({
        message: "Invalid sort option"
      });
    }

    const data = await getMoviesByGenre(
      Number(genreId),
      page,
      sortBy
    );

    res.status(200).json({
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      genreId: Number(genreId),
      sortBy,
      movies: data.results
    });

  } catch (error) {
    
    console.error(
      "TMDB genre movies error:",
      error
    );

    res.status(500).json({
      message: "Failed to load movies by genre"
    });
  }
};


module.exports = {
  searchTMDBMovies,
  getTMDBMovie,
  getPopularTMDBMovies,
  getTMDBMoviesByGenre
};