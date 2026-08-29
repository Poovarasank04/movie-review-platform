import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const createTMDBReview = async (
  tmdbMovieId,
  reviewData,
  token
) => {
  const response = await api.post(
    `/reviews/tmdb/${tmdbMovieId}`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export default api;