import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword, resetPassword } from "../api/auth";
import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Backend issues a one-time code (OTP) rather than a clickable link.
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [devOtp, setDevOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await forgotPassword(email);
      if (data?.devOtp) setDevOtp(data.devOtp); // dev/testing convenience only
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await resetPassword({ email, otp, newPassword });
      setResetDone(true);
    } catch (err) {
      setError(err.message || "Unable to reset your password. Please check the code and try again.");
    } finally {
      setSubmitting(false);
    }
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
              No worries, enter your email and we&rsquo;ll send you a code to reset it.
            </p>

            {error && (
              <p className="welcome-subtitle" style={{ color: "#ef4444", fontWeight: 600 }}>
                {error}
              </p>
            )}

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

              <button type="submit" className="signin-btn" disabled={submitting}>
                {submitting ? "Sending..." : "Send reset code"}
              </button>
            </form>
          </>
        ) : !resetDone ? (
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
              We&rsquo;ve sent a 6-digit code to <strong>{email}</strong>. Enter it below along
              with your new password.
              {devOtp && (
                <>
                  {" "}
                  (Dev mode code: <strong>{devOtp}</strong>)
                </>
              )}
            </p>

            {error && (
              <p className="welcome-subtitle" style={{ color: "#ef4444", fontWeight: 600 }}>
                {error}
              </p>
            )}

            <form onSubmit={handleResetSubmit} noValidate>
              <label className="field-label" htmlFor="otp">
                Reset code
              </label>
              <div className="input-wrap">
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <label className="field-label" htmlFor="newPassword">
                New password
              </label>
              <div className="input-wrap">
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Create a new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="signin-btn" disabled={submitting}>
                {submitting ? "Resetting..." : "Reset password"}
              </button>
            </form>

            <button
              type="button"
              className="signin-btn"
              style={{ marginTop: 10, background: "transparent", color: "#2f6fed" }}
              onClick={() => setSubmitted(false)}
            >
              Use a different email
            </button>
          </>
        ) : (
          <>
            <div className="success-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 13 4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="welcome-title">Password reset</h1>
            <p className="welcome-subtitle">
              Your password has been changed successfully. You can now sign in with your new
              password.
            </p>
            <button type="button" className="signin-btn" onClick={() => navigate("/")}>
              Back to sign in
            </button>
          </>
        )}

        <p className="signup-row">
          <Link to="/" className="back-link">
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
          </Link>
        </p>
      </div>
    </div>
  );
}
