// Centralized API client for the ExpenseOS backend.
// All pages import from here instead of calling fetch() directly, so the
// base URL, auth headers, and token-refresh logic live in exactly one place.

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000/api";

const ACCESS_TOKEN_KEY = "expenseos_access_token";
const REFRESH_TOKEN_KEY = "expenseos_refresh_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

let refreshPromise = null;

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  if (!refreshPromise) {
    refreshPromise = fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Session expired");
        setTokens(json.data);
        return json.data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

/**
 * Core request helper. Automatically attaches the bearer token, retries once
 * after a silent token refresh on 401, and unwraps { success, data, message }.
 */
export async function apiRequest(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const doFetch = async (token) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    return { res, json };
  };

  let { res, json } = await doFetch(getAccessToken());

  if (res.status === 401 && auth && getRefreshToken()) {
    try {
      const newToken = await refreshAccessToken();
      ({ res, json } = await doFetch(newToken));
    } catch (err) {
      clearTokens();
      const authError = new Error("Session expired. Please sign in again.");
      authError.status = 401;
      authError.sessionExpired = true;
      throw authError;
    }
  }

  if (!res.ok || json.success === false) {
    const error = new Error(json.message || `Request failed (${res.status})`);
    error.status = res.status;
    error.errors = json.errors;
    throw error;
  }

  return json.data;
}

export const api = {
  get: (path, opts) => apiRequest(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => apiRequest(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => apiRequest(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => apiRequest(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => apiRequest(path, { ...opts, method: "DELETE" }),
};

export { API_BASE_URL };
