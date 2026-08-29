import { useEffect, useState } from "react";

import EmptyState from "../components/EmptyState";
import MovieSearch from "../components/MovieSearch";
import TMDBMovieCard from "../components/TMDBMovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieRow from "../components/MovieRow";

import {
  getPopularTMDBMovies,
  getTopRatedTMDBMovies,
  searchMovies,
  discoverMovies,
  getMoviesByGenre
} from "../services/tmdbService";

function Home() {
  

  // =========================
  // POPULAR MOVIES
  // =========================

  const [popularMovies, setPopularMovies] =
  useState([]);

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
// DISCOVER MOVIES
// =========================

const [movies, setMovies] =
  useState([]);

const [discoverPage, setDiscoverPage] =
  useState(1);

const [discoverTotalPages, setDiscoverTotalPages] =
  useState(1);

const [discoverLoading, setDiscoverLoading] =
  useState(false);

const [discoverError, setDiscoverError] =
  useState("");
  // =========================
// TOP RATED MOVIES
// =========================

const [topRatedMovies, setTopRatedMovies] =
  useState([]);

const [topRatedPage, setTopRatedPage] =
  useState(1);

const [topRatedTotalPages, setTopRatedTotalPages] =
  useState(1);

const [topRatedLoading, setTopRatedLoading] =
  useState(true);

const [topRatedLoadingMore, setTopRatedLoadingMore] =
  useState(false);

const [topRatedError, setTopRatedError] =
  useState("");


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

        setPopularMovies(response.movies);

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
// LOAD TOP RATED MOVIES
// =========================

useEffect(() => {

  const loadTopRatedMovies = async () => {

    try {

      setTopRatedLoading(true);
      setTopRatedError("");

      const response =
        await getTopRatedTMDBMovies(1);

      setTopRatedMovies(
        response.movies
      );

      setTopRatedPage(
        response.page
      );

      setTopRatedTotalPages(
        response.totalPages
      );

    } catch (error) {

      console.error(error);

      setTopRatedError(
        "Failed to load top rated movies"
      );

    } finally {

      setTopRatedLoading(false);

    }

  };

  loadTopRatedMovies();

}, []);


// =========================
// LOAD DISCOVER MOVIES
// =========================

useEffect(() => {

  const loadDiscoverMovies = async () => {

    try {

      setDiscoverLoading(true);
      setDiscoverError("");

      const response =
        await discoverMovies(
          "",
          1,
          "popularity.desc"
        );

      setMovies(
        response.movies
      );

      setDiscoverPage(
        response.page
      );

      setDiscoverTotalPages(
        response.totalPages
      );

    } catch (error) {

      console.error(error);

      setDiscoverError(
        "Failed to load discover movies"
      );

    } finally {

      setDiscoverLoading(false);

    }

  };

  loadDiscoverMovies();

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

      const response =
        await getPopularTMDBMovies(nextPage); 

      setPopularMovies((previousMovies) => [
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
// LOAD MORE TOP RATED
// =========================

const handleLoadMoreTopRated = async () => {

  if (
    topRatedLoadingMore ||
    topRatedPage >= topRatedTotalPages
  ) {
    return;
  }

  try {

    setTopRatedLoadingMore(true);

    const nextPage =
      topRatedPage + 1;

    const response =
      await getTopRatedTMDBMovies(
        nextPage
      );

    setTopRatedMovies(
      (previousMovies) => [
        ...previousMovies,
        ...response.movies
      ]
    );

    setTopRatedPage(
      response.page
    );

  } catch (error) {

    console.error(error);

  } finally {

    setTopRatedLoadingMore(false);

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
  setDiscoverPage(1);

  try {

    setDiscoverLoading(true);
    setDiscoverError("");

    const response =
      await discoverMovies(
        genreId,
        1,
        selectedSort
      );

    setMovies(
      response.movies
    );

    setDiscoverPage(
      response.page
    );

    setDiscoverTotalPages(
      response.totalPages
    );

  } catch (error) {

    console.error(error);

    setDiscoverError(
      "Failed to load discover movies"
    );

  } finally {

    setDiscoverLoading(false);

  }

};
  const handleSortChange = async (e) => {

  const sortBy = e.target.value;

  setSelectedSort(sortBy);
  setDiscoverPage(1);

  try {

    setDiscoverLoading(true);
    setDiscoverError("");

    const response =
      await discoverMovies(
        selectedGenre,
        1,
        sortBy
      );

    setMovies(
      response.movies
    );

    setDiscoverPage(
      response.page
    );

    setDiscoverTotalPages(
      response.totalPages
    );

  } catch (error) {

    console.error(error);

    setDiscoverError(
      "Failed to sort movies"
    );

  } finally {

    setDiscoverLoading(false);

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
          DISCOVER MOVIES
      ========================= */}

      <section className="container movies-section">

        <div className="section-header">

          <span>
            {movies.length} movies
          </span>

        </div>


        {discoverLoading ? (

          <Loading
            message="Loading discover movies..."
          />

        ) : discoverError ? (

          <ErrorMessage
            message={discoverError}
            onRetry={() => handleGenreChange({
              target: {
                value: selectedGenre
              }
            })}
          />

        ) : movies.length === 0 ? (

          <EmptyState
            icon="🎬"
            title="No discover results"
            message="Try changing the genre or sorting option."
          />

        ) : (

          <div className="movie-grid">

            {movies.map((movie) => (

              <TMDBMovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </div>

        )}

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
            {popularMovies.length} movies
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

        ) : popularMovies.length === 0 ? (

          <EmptyState
            icon="🎬"
            title="No movies found"
            message="Popular movies are unavailable right now."
          />

        ) : (

          <>

            <div className="movie-grid">

              {popularMovies.map((movie) => (

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

            {/* =========================
          TOP RATED MOVIES
      ========================= */}

      <section className="container movies-section">

        <div className="section-header">

          <h2>
            Top Rated Movies
          </h2>

          <span>
            {topRatedMovies.length} movies
          </span>

        </div>


        {topRatedLoading ? (

          <Loading
            message="Loading top rated movies..."
          />

        ) : topRatedError ? (

          <ErrorMessage
            message={topRatedError}
            onRetry={() =>
              window.location.reload()
            }
          />

        ) : topRatedMovies.length === 0 ? (

          <EmptyState
            icon="⭐"
            title="No top rated movies"
            message="Top rated movies are unavailable right now."
          />

        ) : (

          <>

            <div className="movie-grid">

              {topRatedMovies.map((movie) => (

                <TMDBMovieCard
                  key={movie.id}
                  movie={movie}
                />

              ))}

            </div>


            {topRatedPage < topRatedTotalPages && (

              <div className="pagination-container">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleLoadMoreTopRated}
                  disabled={topRatedLoadingMore}
                >

                  {topRatedLoadingMore
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