import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">

      <Link to={`/movies/${movie._id}`}>

        <div className="movie-poster">

          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className="poster-placeholder">
              🎬
            </div>
          )}

        </div>


        <div className="movie-card-content">

          <h3>
            {movie.title}
          </h3>

          <p className="movie-year">
            {movie.releaseYear}
          </p>

          <p className="movie-description">
            {movie.description}
          </p>

          <div className="movie-meta">

            <span>
              {movie.genre?.slice(0, 2).join(" • ")}
            </span>

          </div>

        </div>

      </Link>

    </article>
  );
}

export default MovieCard;