import { api } from "./client";

export const listPlans = () => api.get("/subscriptions/plans");
export const getCurrentSubscription = () => api.get("/subscriptions/current");
export const subscribeToPlan = (planId, method) =>
  api.post("/subscriptions/subscribe", { planId, method });
export const cancelSubscription = (id) => api.post(`/subscriptions/${id}/cancel`);
export const listPayments = () => api.get("/subscriptions/payments");
export const listInvoices = () => api.get("/subscriptions/invoices");
export const getInvoice = (id) => api.get(`/subscriptions/invoices/${id}`);
