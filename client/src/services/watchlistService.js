import api from "./api";


// GET WATCHLIST
export const getWatchlist = async (token) => {

  const response = await api.get(
    "/watchlist",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// ADD MOVIE
export const addToWatchlist = async (
  movie,
  token
) => {

  const response = await api.post(
    "/watchlist",
    {
      tmdbMovieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


// REMOVE MOVIE
export const removeFromWatchlist = async (
  tmdbMovieId,
  token
) => {

  const response = await api.delete(
    `/watchlist/${tmdbMovieId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};