import { Link } from "react-router-dom";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

function TMDBMovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <article className="tmdb-movie-card">

      <Link
        to={`/tmdb-movies/${movie.id}`}
        className="tmdb-movie-link"
      >

        <div className="tmdb-poster">

          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
            />
          ) : (
            <div className="poster-placeholder">
              🎬
            </div>
          )}

        </div>


        <div className="tmdb-movie-info">

          <h3>
            {movie.title}
          </h3>

          <div className="movie-meta">

            <span>
              {releaseYear}
            </span>

            <span>
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </span>

          </div>

        </div>

      </Link>

    </article>
  );
}

export default TMDBMovieCard;