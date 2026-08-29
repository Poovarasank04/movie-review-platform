import api from "./api";

export const getMovies = async () => {
  const response = await api.get("/movies");

  return response.data;
};

export const getMovie = async (movieId) => {
  const response = await api.get(`/movies/${movieId}`);

  return response.data;
};

export const createMovie = async (movieData, token) => {
  const response = await api.post(
    "/movies",
    movieData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateMovie = async (
  movieId,
  movieData,
  token
) => {
  const response = await api.put(
    `/movies/${movieId}`,
    movieData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteMovie = async (
  movieId,
  token
) => {
  const response = await api.delete(
    `/movies/${movieId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};