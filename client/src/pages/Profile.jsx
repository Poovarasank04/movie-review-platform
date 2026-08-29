import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getMyReviews } from "../services/reviewService";
import { getWatchlist } from "../services/watchlistService";

function Profile() {

  const { user, token } = useAuth();

  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [watchlistCount, setWatchlistCount] = useState(0);


  useEffect(() => {

    const loadProfileData = async () => {
        try {
            setLoading(true);

            const [reviewResponse, watchlistResponse] =
            await Promise.all([
                getMyReviews(token),
                getWatchlist(token)
            ]);

            setReviewCount(
            reviewResponse.count
            );

            setWatchlistCount(
            watchlistResponse.count
            );

        } catch (error) {

            console.error(
            "Failed to load profile data:",
            error
            );

        } finally {

            setLoading(false);

        }
        };
    if (token) {
      loadProfileData();
    }

  }, [token]);


  return (
    <main className="page">

      <div className="container">

        <section className="profile-page">

          <div className="profile-header">

            <div className="profile-avatar">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <span className="section-label">
                YOUR ACCOUNT
              </span>

              <h1>
                {user?.name}
              </h1>

              <p>
                {user?.email}
              </p>

            </div>

          </div>


          <div className="profile-stats">

            <div className="profile-stat">

              <span className="profile-stat-icon">
                ❤️
              </span>

                <strong>
                {loading ? "..." : watchlistCount}
                </strong>

                <p>
                Movies in your watchlist
                </p>

                <Link to="/watchlist">
                View Watchlist →
                </Link>
            </div>


            <div className="profile-stat">

              <span className="profile-stat-icon">
                💬
              </span>

              <strong>
                {loading
                  ? "..."
                  : reviewCount}
              </strong>

              <p>
                Movies you've reviewed
              </p>

              <Link to="/my-reviews">
                View My Reviews →
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Profile;