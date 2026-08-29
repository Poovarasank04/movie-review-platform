import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  return (
    <header className="navbar">

      <div className="container navbar-inner">

        <Link
          to="/"
          className="navbar-brand"
        >
          🎬 MovieHub
        </Link>


        <nav className="navbar-links">

          <Link to="/">
            Movies
          </Link>


          {isAuthenticated ? (
            <>

              <Link to="/watchlist">
                ❤️ Watchlist
              </Link>

              <Link to="/profile">
                👤 Profile
              </Link>

              <span className="navbar-user">
                Hi, {user.name}
              </span>

              <button
                className="navbar-button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Navbar;