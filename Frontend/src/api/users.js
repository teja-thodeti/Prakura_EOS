import { api } from "./client";

export const getProfile = () => api.get("/users/me/profile");
export const updateProfile = (payload) => api.put("/users/me/profile", payload);
export const changePassword = (payload) => api.post("/users/me/change-password", payload);
export const updateOnboarding = (payload) => api.put("/users/me/onboarding", payload);
export const deactivateAccount = () => api.post("/users/me/deactivate");
