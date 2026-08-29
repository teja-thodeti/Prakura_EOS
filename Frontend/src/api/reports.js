import { api } from "./client";

const withRange = (path, range = {}) => {
  const qs = new URLSearchParams(range).toString();
  return api.get(`${path}${qs ? `?${qs}` : ""}`);
};

export const getSummary = (range) => withRange("/reports/summary", range);
export const getSpendingByCategory = (range) => withRange("/reports/spending-by-category", range);
export const getIncomeVsExpense = (range) => withRange("/reports/income-vs-expense", range);
export const getNetWorthTrend = (range) => withRange("/reports/net-worth-trend", range);
