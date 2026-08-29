import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  createTMDBReview
} from "../services/reviewService";


function ReviewForm({
  tmdbMovieId,
  onReviewCreated
}) {

  const { token } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      await createTMDBReview(
        tmdbMovieId,
        {
          rating,
          comment
        },
        token
      );

      setComment("");
      setRating(5);

      await onReviewCreated();

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to create review"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="review-form">

      <div className="review-form-header">

        <div>

          <span className="section-label">
            YOUR OPINION
          </span>

          <h3>
            Write a Review
          </h3>

        </div>

      </div>


      {error && (
        <div className="form-error">
          {error}
        </div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label htmlFor="rating">
            Rating
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value)
              )
            }
          >

            <option value={5}>
              5 ★ — Excellent
            </option>

            <option value={4}>
              4 ★ — Great
            </option>

            <option value={3}>
              3 ★ — Good
            </option>

            <option value={2}>
              2 ★ — Not great
            </option>

            <option value={1}>
              1 ★ — Poor
            </option>

          </select>

        </div>


        <div className="form-group">

          <label htmlFor="comment">
            Your Review
          </label>

          <textarea
            id="comment"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="What did you think about this movie?"
            rows={5}
            maxLength={1000}
            required
          />

          <span className="character-count">
            {comment.length}/1000
          </span>

        </div>


        <div className="review-form-footer">

          <p>
            Your review will be visible to other users.
          </p>

          <button
            type="submit"
            className="primary-button review-submit-button"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Submit Review"}

          </button>

        </div>

      </form>

    </div>
  );
}


export default ReviewForm;