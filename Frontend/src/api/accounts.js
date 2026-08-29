import { api } from "./client";

export const listAccounts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/accounts${qs ? `?${qs}` : ""}`);
};
export const getAccount = (id) => api.get(`/accounts/${id}`);
export const createAccount = (payload) => api.post("/accounts", payload);
export const updateAccount = (id, payload) => api.put(`/accounts/${id}`, payload);
export const archiveAccount = (id) => api.patch(`/accounts/${id}/archive`);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);
