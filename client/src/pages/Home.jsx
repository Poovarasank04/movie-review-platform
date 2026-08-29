import { useEffect, useState } from "react";

import EmptyState from "../components/EmptyState";
import MovieSearch from "../components/MovieSearch";
import TMDBMovieCard from "../components/TMDBMovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  getPopularTMDBMovies,
  searchMovies,
  getMoviesByGenre
} from "../services/tmdbService";


function Home() {

  // =========================
  // POPULAR MOVIES
  // =========================

  const [movies, setMovies] = useState([]);

  const [popularPage, setPopularPage] =
    useState(1);

  const [popularTotalPages, setPopularTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [loadingMorePopular, setLoadingMorePopular] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedGenre, setSelectedGenre] =  useState("");

  const [selectedSort, setSelectedSort] =  useState("popularity.desc");

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" }
  ];
  // =========================
  // SEARCH
  // =========================

  const [searchResults, setSearchResults] =
    useState(null);

  const [searchPage, setSearchPage] =
    useState(1);

  const [searchTotalPages, setSearchTotalPages] =
    useState(1);

  const [searchLoadingMore, setSearchLoadingMore] =
    useState(false);


  // =========================
  // LOAD POPULAR MOVIES
  // =========================

  useEffect(() => {

    const loadPopularMovies = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await getPopularTMDBMovies(1);

        setMovies(response.movies);

        setPopularPage(response.page);

        setPopularTotalPages(
          response.totalPages
        );

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load popular movies"
        );

      } finally {

        setLoading(false);

      }

    };

    loadPopularMovies();

  }, []);


  // =========================
  // LOAD MORE POPULAR
  // =========================

  const handleLoadMorePopular = async () => {

    if (
      loadingMorePopular ||
      popularPage >= popularTotalPages
    ) {
      return;
    }

    try {

      setLoadingMorePopular(true);

      const nextPage =
        popularPage + 1;

      const response = selectedGenre
        ? await getMoviesByGenre(
            selectedGenre,
            nextPage,
            selectedSort
          )
        : await getPopularTMDBMovies(
            nextPage
          );
      setMovies((previousMovies) => [
        ...previousMovies,
        ...response.movies
      ]);

      setPopularPage(response.page);

    } catch (error) {

      console.error(error);

    } finally {

      setLoadingMorePopular(false);

    }
  };

  // =========================
  // NEW SEARCH
  // =========================

  const handleSearchResults = (data) => {

    setSearchResults(data);

    if (data) {

      setSearchPage(data.page);

      setSearchTotalPages(
        data.totalPages
      );

    } else {

      setSearchPage(1);
      setSearchTotalPages(1);

    }

  };


  // =========================
  // LOAD MORE SEARCH RESULTS
  // =========================

  const handleLoadMoreSearch = async () => {

    if (
      searchLoadingMore ||
      !searchResults ||
      searchPage >= searchTotalPages
    ) {
      return;
    }

    try {

      setSearchLoadingMore(true);

      const nextPage =
        searchPage + 1;

      const response =
        await searchMovies(
          searchResults.query,
          nextPage
        );

      setSearchResults((previous) => ({
        ...previous,

        page: response.page,

        movies: [
          ...previous.movies,
          ...response.movies
        ]
      }));

      setSearchPage(response.page);

    } catch (error) {

      console.error(error);

    } finally {

      setSearchLoadingMore(false);

    }

  };

  const handleGenreChange = async (e) => {

    const genreId = e.target.value;

    setSelectedGenre(genreId);
    setPopularPage(1);

    try {

      setLoading(true);
      setError("");

      if (!genreId) {

        const response =
          await getPopularTMDBMovies(1);

        setMovies(response.movies);

        setPopularPage(response.page);

        setPopularTotalPages(
          response.totalPages
        );

        return;
      }

      const response =
        await getMoviesByGenre(
          genreId,
          1,
          selectedSort
        );

      setMovies(response.movies);

      setPopularPage(response.page);

      setPopularTotalPages(
        response.totalPages
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load genre movies"
      );

    } finally {

      setLoading(false);

    }
  };


  const handleSortChange = async (e) => {

    const sortBy = e.target.value;

    setSelectedSort(sortBy);
    setPopularPage(1);

    try {

      setLoading(true);
      setError("");

      if (!selectedGenre) {

        const response =
          await getPopularTMDBMovies(1);

        setMovies(response.movies);

        setPopularPage(response.page);

        setPopularTotalPages(
          response.totalPages
        );

        return;
      }

      const response =
        await getMoviesByGenre(
          selectedGenre,
          1,
          sortBy
        );

      setMovies(response.movies);

      setPopularPage(response.page);

      setPopularTotalPages(
        response.totalPages
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to sort movies"
      );

    } finally {

      setLoading(false);

    }
  };



  return (
    <main>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero container">

        <p className="hero-label">
          MOVIE REVIEW PLATFORM
        </p>

        <h1>
          Discover your next
          <br />
          favorite movie.
        </h1>

        <p className="hero-description">
          Explore movies, discover great stories,
          and share your thoughts with other movie lovers.
        </p>

      </section>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="container">

        <MovieSearch
          onResults={handleSearchResults}
        />

      </div>


      {/* =========================
          SEARCH RESULTS
      ========================= */}

      {searchResults && (

        <section className="search-results container">

          <div className="section-heading">

            <h2>
              Search Results
            </h2>

            <p>
              {searchResults.totalResults}
              {" "}
              movies found
            </p>

          </div>


          {searchResults.movies.length === 0 ? (

            <EmptyState
              icon="🔎"
              title="No movies found"
              message="Try searching for another movie."
            />

          ) : (

            <>

              <div className="movie-grid">

                {searchResults.movies.map(
                  (movie) => (

                    <TMDBMovieCard
                      key={movie.id}
                      movie={movie}
                    />

                  )
                )}

              </div>


              {/* SEARCH LOAD MORE */}

              {searchPage < searchTotalPages && (

                <div className="pagination-container">

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleLoadMoreSearch}
                    disabled={searchLoadingMore}
                  >

                    {searchLoadingMore
                      ? "Loading..."
                      : "Load More"}

                  </button>

                </div>

              )}

            </>

          )}

        </section>

      )}


      <section className="container movie-filters">

        <div className="section-header">

          <h2>
            Discover
          </h2>

          <div className="filter-controls">

            <select
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">
                All Genres
              </option>

              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </option>
              ))}
            </select>


            <select
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="popularity.desc">
                Popularity
              </option>

              <option value="vote_average.desc">
                Top Rated
              </option>

              <option value="primary_release_date.desc">
                Newest
              </option>
            </select>

          </div>
        </div>

      </section>

      {/* =========================
          POPULAR MOVIES
      ========================= */}

      <section className="container movies-section">

        <div className="section-header">

          <h2>
            Popular Movies
          </h2>

          <span>
            {movies.length} movies
          </span>

        </div>


        {loading ? (

          <Loading
            message="Loading popular movies..."
          />

        ) : error ? (

          <ErrorMessage
            message={error}
            onRetry={() =>
              window.location.reload()
            }
          />

        ) : movies.length === 0 ? (

          <EmptyState
            icon="🎬"
            title="No movies found"
            message="Popular movies are unavailable right now."
          />

        ) : (

          <>

            <div className="movie-grid">

              {movies.map((movie) => (

                <TMDBMovieCard
                  key={movie.id}
                  movie={movie}
                />

              ))}

            </div>


            {/* POPULAR LOAD MORE */}

            {popularPage < popularTotalPages && (

              <div className="pagination-container">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleLoadMorePopular}
                  disabled={loadingMorePopular}
                >

                  {loadingMorePopular
                    ? "Loading..."
                    : "Load More"}

                </button>

              </div>

            )}

          </>

        )}

      </section>

    </main>
  );
}

export default Home;