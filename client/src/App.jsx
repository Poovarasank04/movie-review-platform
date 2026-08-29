import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./index.css";

import Navbar from "./components/Navbar";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TMDBMovieDetails from "./pages/TMDBMovieDetails";
import MyReviews from "./pages/MyReviews";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/tmdb-movies/:tmdbId"
          element={<TMDBMovieDetails />}
        />


        {/* Protected routes */}

        <Route element={<ProtectedRoute />}>

            <Route
              path="/watchlist"
              element={<Watchlist />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/my-reviews"
              element={<MyReviews />}
            />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}


export default App;