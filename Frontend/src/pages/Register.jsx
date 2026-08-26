import React, { useState, useEffect } from "react";
import "../styles/Register.css";

const QUOTES = [
  "“A budget is telling your money where to go instead of wondering where it went.”",
  "“Beware of little expenses. A small leak will sink a great ship.”",
  "“Every rupee you track today is a decision you don’t have to regret tomorrow.”",
  "“Do not save what is left after spending, spend what is left after saving.”",
  "“It's not about how much you make, but how much you keep.”",
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setFade(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /auth/register
  };

  return (
    <div className="login-page">
      {/* Left panel — rotating expense quotes */}
      <div className="quote-panel">
        <div className="quote-mark">“</div>
        <div className={`quote-text ${fade ? "quote-visible" : "quote-hidden"}`}>
          {QUOTES[quoteIndex]}
        </div>
        <div className="quote-dots">
          {QUOTES.map((_, i) => (
            <span
              key={i}
              className={`quote-dot ${i === quoteIndex ? "quote-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Right panel — register form */}
      <div className="login-panel">
        <div className="login-box">
          <div className="brand-row">
            <div className="brand-logo">P</div>
            <span className="brand-name">Prakura</span>
          </div>

          <h1 className="welcome-title">Create account</h1>
          <p className="welcome-subtitle">Join Prakura ExpenseOS and take control of your money</p>

          <form onSubmit={handleSubmit} noValidate>
            <label className="field-label" htmlFor="name">
              Full name
            </label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4.5 19.5c1.6-3.5 4.4-5.3 7.5-5.3s5.9 1.8 7.5 5.3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                id="name"
                type="text"
                placeholder="Prakura Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

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

            <label className="field-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="10.5"
                    width="14"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M6.5 6.7C4 8.3 2 12 2 12s3.6 7 10 7c1.8 0 3.3-.5 4.6-1.2M9.9 4.3A10.5 10.5 0 0 1 12 4c6.4 0 10 8 10 8a17 17 0 0 1-2.6 3.7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            <label className="field-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="10.5"
                    width="14"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M6.5 6.7C4 8.3 2 12 2 12s3.6 7 10 7c1.8 0 3.3-.5 4.6-1.2M9.9 4.3A10.5 10.5 0 0 1 12 4c6.4 0 10 8 10 8a17 17 0 0 1-2.6 3.7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="terms-row">
              <label className="terms-check">
                <input type="checkbox" required />
                <span>
                  I agree to the <a href="/terms">Terms</a> and{" "}
                  <a href="/privacy">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="signin-btn">
              Create account
            </button>
          </form>

          <p className="signup-row">
            Already have an account?{" "}
            <a href="/login" className="signup-link">
              Sign in
            </a>
          </p>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="google-btn">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5Z"
              />
              <path
                fill="#FF3D00"
                d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6 29.6 4 24 4c-7.4 0-13.8 4.2-17.1 10.4Z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.5 0 10.4-1.9 14.1-5.1l-6.5-5.5C29.6 35.1 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5.1C9.9 39.6 16.4 44 24 44Z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4 5.5l6.5 5.5C39.9 36.9 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5Z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
