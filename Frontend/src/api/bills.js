import { api } from "./client";

export const listBills = (status) => api.get(`/bills${status ? `?status=${status}` : ""}`);
export const getBill = (id) => api.get(`/bills/${id}`);
export const createBill = (payload) => api.post("/bills", payload);
export const updateBill = (id, payload) => api.put(`/bills/${id}`, payload);
export const deleteBill = (id) => api.delete(`/bills/${id}`);
export const payBill = (id, accountId) => api.post(`/bills/${id}/pay`, { accountId });
