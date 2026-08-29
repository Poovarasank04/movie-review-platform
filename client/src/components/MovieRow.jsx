import { useRef } from "react";
import TMDBMovieCard from "./TMDBMovieCard";

function MovieRow({
  title,
  movies,
  loading,
  loadingMore,
  hasMore,
  onLoadMore
}) {

  const rowRef = useRef(null);

  const scrollLeft = () => {

    rowRef.current?.scrollBy({
      left: -700,
      behavior: "smooth"
    });

  };

  const scrollRight = () => {

    rowRef.current?.scrollBy({
      left: 700,
      behavior: "smooth"
    });

  };

  const handleRightClick = async () => {

    const row = rowRef.current;

    if (!row) {
      return;
    }

    const isNearEnd =
      row.scrollLeft + row.clientWidth >=
      row.scrollWidth - 100;

    if (isNearEnd && hasMore && !loadingMore) {
      await onLoadMore();
    }

    scrollRight();

  };

  return (
    <section className="movie-row-section">

      <div className="movie-row-header">

        <h2>
          {title}
        </h2>

        <div className="movie-row-controls">

          <button
            type="button"
            className="movie-row-arrow"
            onClick={scrollLeft}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>

          <button
            type="button"
            className="movie-row-arrow"
            onClick={handleRightClick}
            disabled={loadingMore}
            aria-label={`Load more ${title}`}
          >
            {loadingMore ? "…" : "›"}
          </button>

        </div>

      </div>


      {loading ? (

        <div className="movie-row-loading">
          Loading movies...
        </div>

      ) : (

        <div
          ref={rowRef}
          className="movie-row"
        >

          {movies.map((movie) => (

            <div
              className="movie-row-card"
              key={movie.id}
            >

              <TMDBMovieCard movie={movie} />

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MovieRow;