import { api } from "./client";

export const listTransactions = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/transactions${qs ? `?${qs}` : ""}`);
};
export const getTransaction = (id) => api.get(`/transactions/${id}`);
export const createTransaction = (payload) => api.post("/transactions", payload);
export const updateTransaction = (id, payload) => api.put(`/transactions/${id}`, payload);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
