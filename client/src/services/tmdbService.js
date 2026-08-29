import api from "./api";


export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/tmdb/search", {
    params: {
      query,
      page
    }
  });

  return response.data;
};


export const getTMDBMovie = async (tmdbId) => {
  const response = await api.get(
    `/tmdb/${tmdbId}`
  );

  return response.data;
};


export const getPopularTMDBMovies = async (page = 1) => {
  const response = await api.get(
    "/tmdb/popular",
    {
      params: {
        page
      }
    }
  );

  return response.data;
};

export const getMoviesByGenre = async (
  genreId,
  page = 1,
  sortBy = "popularity.desc"
) => {

  const response = await api.get(
    `/tmdb/genre/${genreId}`,
    {
      params: {
        page,
        sortBy
      }
    }
  );

  return response.data;
};

export const getTopRatedTMDBMovies = async (page = 1) => {
  const response = await api.get(
    "/tmdb/top-rated",
    {
      params: {
        page
      }
    }
  );

  return response.data;
};

export const discoverMovies = async (
  genreId = "",
  page = 1,
  sortBy = "popularity.desc"
) => {

  const response = await api.get(
    "/tmdb/discover",
    {
      params: {
        genreId,
        page,
        sortBy
      }
    }
  );

  return response.data;
};