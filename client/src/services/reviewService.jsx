import api from "./api";

export const getTMDBReviews = async (tmdbMovieId) => {
  const response = await api.get(
    `/reviews/tmdb/${tmdbMovieId}`
  );

  return response.data;
};


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

export const updateReview = async (
  reviewId,
  reviewData,
  token
) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteReview = async (
  reviewId,
  token
) => {
  const response = await api.delete(
    `/reviews/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getMyReviews = async (token) => {
  const response = await api.get(
    "/reviews/me",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};