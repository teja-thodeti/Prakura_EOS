import { api, setTokens, clearTokens } from "./client";

export async function register({ name, email, password }) {
  const data = await api.post("/auth/register", { name, email, password }, { auth: false });
  setTokens(data);
  return data;
}

export async function login({ email, password }) {
  const data = await api.post("/auth/login", { email, password }, { auth: false });
  setTokens(data);
  return data;
}

export async function logout() {
  const refreshToken = localStorage.getItem("expenseos_refresh_token");
  try {
    await api.post("/auth/logout", { refreshToken }, { auth: false });
  } finally {
    clearTokens();
  }
}

export function forgotPassword(email) {
  return api.post("/auth/forgot-password", { email }, { auth: false });
}

export function resetPassword({ email, otp, newPassword }) {
  return api.post("/auth/reset-password", { email, otp, newPassword }, { auth: false });
}

export function getMe() {
  return api.get("/auth/me");
}
