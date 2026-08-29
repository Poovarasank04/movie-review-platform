import { useState } from "react";
import { searchMovies } from "../services/tmdbService";

function MovieSearch({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      // New search = reset to page 1
      const data = await searchMovies(
        trimmedQuery,
        1
      );

      onResults(data);

    } catch (error) {
      console.error(error);

      onResults(null);

      setError(
        error.response?.data?.message ||
        "Failed to search movies"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="movie-search">

      <form
        className="search-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search movies..."
        />

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Search"}
        </button>

      </form>

      {error && (
        <p className="search-error">
          {error}
        </p>
      )}

    </section>
  );
}

export default MovieSearch;