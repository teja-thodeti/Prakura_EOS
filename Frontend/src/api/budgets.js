import { api } from "./client";

export const listBudgets = () => api.get("/budgets");
export const getBudget = (id) => api.get(`/budgets/${id}`);
export const createBudget = (payload) => api.post("/budgets", payload);
export const updateBudget = (id, payload) => api.put(`/budgets/${id}`, payload);
export const deleteBudget = (id) => api.delete(`/budgets/${id}`);
