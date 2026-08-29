import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-header">

          <Link
            to="/"
            className="auth-logo"
          >
            🎬 MovieHub
          </Link>

          <span className="auth-label">
            WELCOME BACK
          </span>

          <h1>
            Sign in
          </h1>

          <p>
            Continue exploring movies and
            sharing your reviews.
          </p>

        </div>


        <div className="auth-card">

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

            </div>


            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

        </div>


        <p className="auth-switch">
          Don't have an account?

          {" "}

          <Link to="/register">
            Create one
          </Link>
        </p>


        <Link
          to="/"
          className="auth-back"
        >
          ← Back to movies
        </Link>

      </div>

    </main>
  );
}

export default Login;