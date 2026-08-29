import { api } from "./client";

export const listCategories = (kind) => api.get(`/categories${kind ? `?kind=${kind}` : ""}`);
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) => api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const listSubcategories = (category) =>
  api.get(`/categories/subcategories${category ? `?category=${category}` : ""}`);
export const createSubcategory = (payload) => api.post("/categories/subcategories", payload);
