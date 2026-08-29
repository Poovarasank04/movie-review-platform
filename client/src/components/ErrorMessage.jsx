function ErrorMessage({
  message = "Something went wrong.",
  onRetry
}) {
  return (
    <div className="error-state">

      <div className="state-icon">
        ⚠️
      </div>

      <h2>
        Something went wrong
      </h2>

      <p>
        {message}
      </p>

      {onRetry && (
        <button
          className="primary-button"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}

    </div>
  );
}

export default ErrorMessage;