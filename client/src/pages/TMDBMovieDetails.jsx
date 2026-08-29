import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getTMDBMovie } from "../services/tmdbService";
import { getTMDBReviews } from "../services/reviewService";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../context/AuthContext";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from "../services/watchlistService";

function TMDBMovieDetails() {
  const { tmdbId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inWatchlist, setInWatchlist] =
    useState(false);

  const [watchlistLoading, setWatchlistLoading] =
    useState(false);
  const { isAuthenticated , token} = useAuth();

  const [reviewData, setReviewData] = useState(null);

const loadMovie = async () => {
  try {
    setLoading(true);
    setError("");
    setReviewData(null);

    const movieResponse =
      await getTMDBMovie(tmdbId);

    const reviewsResponse =
      await getTMDBReviews(tmdbId);

    setMovie(movieResponse.movie);
    setReviewData(reviewsResponse);

    if (isAuthenticated && token) {

      const watchlistResponse =
        await getWatchlist(token);

      const exists =
        watchlistResponse.movies.some(
          (item) =>
            item.tmdbMovieId === Number(tmdbId)
        );

      setInWatchlist(exists);
    }

  } catch (error) {
    console.error(error);

    setError("Failed to load movie");

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadMovie();
}, [tmdbId, isAuthenticated, token]);

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading movie...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <p className="error-message">
          {error}
        </p>

        <Link to="/">
          ← Back to Movies
        </Link>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="page-container">
        <p>Movie not found.</p>
      </main>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director"
  );

  const cast = movie.credits?.cast?.slice(0, 8) || [];


  const handleWatchlistToggle = async () => {

      if (!isAuthenticated) {
        return;
      }

      try {

        setWatchlistLoading(true);

        if (inWatchlist) {

          await removeFromWatchlist(
            tmdbId,
            token
          );

          setInWatchlist(false);

        } else {

          await addToWatchlist(
            movie,
            token
          );

          setInWatchlist(true);
        }

      } catch (error) {

        console.error(
          "Watchlist error:",
          error
        );

      } finally {

        setWatchlistLoading(false);
      }
    };


  return (
    <main className="page-container">

      <Link to="/" className="back-link">
        ← Back to Movies
      </Link>

      <section className="tmdb-details">

        <div className="tmdb-details-poster">

          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className="poster-placeholder">
              🎬
            </div>
          )}

        </div>


        <div className="tmdb-details-content">

          <h1>
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="movie-tagline">
              {movie.tagline}
            </p>
          )}

          <div className="movie-details-meta">

            <span>
              {releaseYear}
            </span>

            <span>
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </span>

            <span>
              {movie.runtime
                ? `${movie.runtime} min`
                : "Runtime N/A"}
            </span>

          </div>


          <h2>Overview</h2>

          <p>
            {movie.overview || "No overview available."}
          </p>


          <h2>Genres</h2>

          <div className="genre-list">

            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="genre-tag"
              >
                {genre.name}
              </span>
            ))}

          </div>


          {director && (
            <>
              <h2>Director</h2>

              <p>
                {director.name}
              </p>
            </>
          )}

          <div className="watchlist-action">

              {isAuthenticated ? (

                <button
                  type="button"
                  className={
                    inWatchlist
                      ? "secondary-button"
                      : "primary-button"
                  }
                  onClick={handleWatchlistToggle}
                  disabled={watchlistLoading}
                >

                  {watchlistLoading
                    ? "Updating..."
                    : inWatchlist
                      ? "✓ In Watchlist"
                      : "♡ Add to Watchlist"}

                </button>

              ) : (

                <p className="watchlist-login-message">
                  Login to add this movie to your watchlist.
                </p>

              )}

            </div>

        </div>

      </section>


      <section className="cast-section">

        <h2>Cast</h2>

        <div className="cast-grid">

          {cast.map((person) => (

            <article
              key={person.id}
              className="cast-card"
            >

              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                />
              ) : (
                <div className="cast-placeholder">
                  👤
                </div>
              )}

              <h3>
                {person.name}
              </h3>

              <p>
                {person.character}
              </p>

            </article>

          ))}

        </div>

      </section>

      <section className="reviews-section">

        <h2>Community Reviews</h2>

        <div className="review-summary">

          <strong>
            ⭐ Average  {reviewData?.averageRating ?? 0}/5
          </strong>

          <span>
            •
          </span>


          <span>
            {reviewData?.count ?? 0} reviews
          </span>
          

        </div>


        {isAuthenticated ? (

          <ReviewForm
            tmdbMovieId={tmdbId}
            onReviewCreated={loadMovie}
          />

        ) : (

          <p>
            Please login to write a review.
          </p>

        )}


        {!reviewData || reviewData.reviews.length === 0 ? (

          <p>
            No reviews yet. Be the first to review this movie!
          </p>

        ) : (

          <div className="reviews-list">

            {reviewData.reviews.map((review) => (

              <ReviewCard
                key={review._id}
                review={review}
                onReviewChanged={loadMovie}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default TMDBMovieDetails;