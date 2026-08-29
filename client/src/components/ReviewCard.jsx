import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import {
  updateReview,
  deleteReview
} from "../services/reviewService";

function ReviewCard({
  review,
  onReviewChanged
}) {
  const { user, token } = useAuth();

  const isOwner =
    user && review.user._id === user._id;

  const moviePoster = review.movie?.poster_path
    ? `https://image.tmdb.org/t/p/w185${review.movie.poster_path}`
    : null;

  const [editing, setEditing] = useState(false);

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await updateReview(
        review._id,
        {
          rating,
          comment
        },
        token
      );

      setEditing(false);

      onReviewChanged();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update review"
      );
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await deleteReview(
        review._id,
        token
      );

      onReviewChanged();

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to delete review"
      );
    } finally {
      setLoading(false);
    }
  };


  if (editing) {
    return (
      <article className="review-card review-card-editing">

        <div className="review-edit-header">
          <h3>Edit your review</h3>

          <button
            type="button"
            className="text-button"
            onClick={() => {
              setEditing(false);
              setRating(review.rating);
              setComment(review.comment);
              setError("");
            }}
          >
            Cancel
          </button>
        </div>


        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        <form
          className="review-edit-form"
          onSubmit={handleUpdate}
        >

          <div className="form-group">

            <label>
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(e.target.value)
                )
              }
            >
              <option value={5}>5 ★</option>
              <option value={4}>4 ★</option>
              <option value={3}>3 ★</option>
              <option value={2}>2 ★</option>
              <option value={1}>1 ★</option>
            </select>

          </div>


          <div className="form-group">

            <label>
              Review
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              required
            />

          </div>


          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </article>
    );
  }


  return (

    <article className="review-card">

      {review.movie && (
          <Link
            to={`/tmdb-movies/${review.tmdbMovieId}`}
            className="review-movie-info"
          >

            {moviePoster ? (
              <img
                src={moviePoster}
                alt={`${review.movie.title} poster`}
                className="review-movie-poster"
              />
            ) : (
              <div className="review-movie-placeholder">
                🎬
              </div>
            )}

            <div>
              <h3>
                {review.movie.title}
              </h3>

              <p>
                {review.movie.release_date
                  ? review.movie.release_date.slice(0, 4)
                  : "N/A"}
              </p>
            </div>

          </Link>
        )}

      <div className="review-card-header">

        <div className="review-user">

          <div className="review-avatar">
            {review.user.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h3>
              {review.user.name}
            </h3>

            <span>
              {new Date(
                review.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

        </div>


        <div className="review-rating">
          <span>★</span>

          {review.rating}
          <small>/5</small>
        </div>

      </div>


      <p className="review-comment">
        {review.comment}
      </p>


      {error && (
        <div className="form-error">
          {error}
        </div>
      )}


      {isOwner && (
        <div className="review-actions">

          <button
            className="secondary-button"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </button>


          <button
            className="danger-button"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>
      )}

    </article>
  );
}

export default ReviewCard;