import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  getWatchlist,
  removeFromWatchlist
} from "../services/watchlistService";

import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";


function Watchlist() {

  const { token } = useAuth();

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [removingId, setRemovingId] =
    useState(null);


  const loadWatchlist = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getWatchlist(token);

      setMovies(response.movies);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load your watchlist"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadWatchlist();

  }, [token]);


  const handleRemove = async (tmdbMovieId) => {

    try {

      setRemovingId(tmdbMovieId);

      await removeFromWatchlist(
        tmdbMovieId,
        token
      );

      setMovies((previousMovies) =>
        previousMovies.filter(
          (movie) =>
            movie.tmdbMovieId !== tmdbMovieId
        )
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to remove movie"
      );

    } finally {

      setRemovingId(null);

    }
  };


  if (loading) {

    return (
      <main className="page">

        <div className="container">

          <Loading
            message="Loading your watchlist..."
          />

        </div>

      </main>
    );
  }


  if (error) {

    return (
      <main className="page">

        <div className="container">

          <ErrorMessage
            message={error}
            onRetry={loadWatchlist}
          />

        </div>

      </main>
    );
  }


  return (
    <main className="page">

      <div className="container">

        <div className="watchlist-header">

          <div>

            <span className="section-label">
              YOUR COLLECTION
            </span>

            <h1>
              My Watchlist
            </h1>

            <p>
              {movies.length}{" "}
              {movies.length === 1
                ? "movie"
                : "movies"}{" "}
              saved
            </p>

          </div>

        </div>


        {movies.length === 0 ? (

          <>

            <EmptyState
              icon="❤️"
              title="Your watchlist is empty"
              message="Movies you save will appear here."
            />

            <div className="watchlist-empty-action">

              <Link
                to="/"
                className="primary-button"
              >
                Discover Movies
              </Link>

            </div>

          </>

        ) : (

          <div className="watchlist-grid">

            {movies.map((movie) => {

              const posterUrl =
                movie.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  : null;

              const releaseYear =
                movie.releaseDate
                  ? movie.releaseDate.slice(0, 4)
                  : "N/A";


              return (
                <article
                  key={movie._id}
                  className="watchlist-card"
                >

                  <Link
                    to={`/tmdb-movies/${movie.tmdbMovieId}`}
                  >

                    <div className="watchlist-poster">

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

                  </Link>


                  <div className="watchlist-card-content">

                    <h3>
                      {movie.title}
                    </h3>

                    <p>
                      {releaseYear}
                    </p>


                    <button
                      type="button"
                      className="danger-button"
                      onClick={() =>
                        handleRemove(
                          movie.tmdbMovieId
                        )
                      }
                      disabled={
                        removingId ===
                        movie.tmdbMovieId
                      }
                    >

                      {removingId ===
                      movie.tmdbMovieId
                        ? "Removing..."
                        : "Remove"}

                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </div>

    </main>
  );
}

export default Watchlist;