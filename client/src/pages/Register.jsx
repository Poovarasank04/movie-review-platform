import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
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
            JOIN MOVIEHUB
          </span>

          <h1>
            Create an account
          </h1>

          <p>
            Join the community and start
            sharing your movie opinions.
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

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
              />

            </div>


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
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
                required
              />

            </div>


            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

        </div>


        <p className="auth-switch">
          Already have an account?

          {" "}

          <Link to="/login">
            Sign in
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

export default Register;