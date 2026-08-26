import React, { useState } from "react";
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /auth/forgot-password
    setSubmitted(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-box">
        <div className="brand-row">
          <div className="brand-logo">P</div>
          <span className="brand-name">Prakura</span>
        </div>

        {!submitted ? (
          <>
            <h1 className="welcome-title">Forgot password?</h1>
            <p className="welcome-subtitle">
              No worries, enter your email and we&rsquo;ll send you a link to reset it.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="prakura@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <button type="submit" className="signin-btn">
                Send reset link
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="success-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="welcome-title">Check your email</h1>
            <p className="welcome-subtitle">
              We&rsquo;ve sent a password reset link to <strong>{email}</strong>. It may take a
              minute to arrive.
            </p>
            <button
              type="button"
              className="signin-btn"
              onClick={() => setSubmitted(false)}
            >
              Use a different email
            </button>
          </>
        )}

        <p className="signup-row">
          <a href="/login" className="back-link">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M5 12l6-6M5 12l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
