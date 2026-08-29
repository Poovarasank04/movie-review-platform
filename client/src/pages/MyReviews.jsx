import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getMyReviews } from "../services/reviewService";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";

function MyReviews() {

  const { token } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReviews = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getMyReviews(token);

      setReviews(response.reviews || []);

    } catch (error) {

      console.error(error);

      setError("Failed to load your reviews");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    if (token) {
      loadReviews();
    }

  }, [token]);


  return (
    <main className="page">

      <div className="container">

        <section className="reviews-section">

          <div className="reviews-header">

            <div>

              <span className="section-label">
                YOUR ACTIVITY
              </span>

              <h2>
                My Reviews
              </h2>

            </div>

            <span className="rating-count">
              {reviews.length} reviews
            </span>

          </div>


          {loading ? (

            <Loading
              message="Loading your reviews..."
            />

          ) : error ? (

            <ErrorMessage
              message={error}
              onRetry={loadReviews}
            />

          ) : reviews.length === 0 ? (

            <EmptyState
              icon="💬"
              title="No reviews yet"
              message="Start reviewing movies you've watched."
            />

          ) : (

            <div className="reviews-list">

              {reviews.map((review) => (

                <ReviewCard
                  key={review._id}
                  review={review}
                  onReviewChanged={loadReviews}
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default MyReviews;