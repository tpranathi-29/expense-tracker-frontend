import api from "./api";

export const getExpenses = async () => {
  return await api.get("/expenses");
};

export const addExpense = async (expense) => {
  return await api.post("/expenses", expense);
};

export const updateExpense = async (id, expense) => {
  return await api.put(`/expenses/${id}`, expense);
};

export const deleteExpense = async (id) => {
  return await api.delete(`/expenses/${id}`);
};

export const searchExpense = async (keyword) => {
  return await api.get(`/expenses/search?keyword=${keyword}`);
};

export const getSummary = async () => {
  return await api.get("/expenses/summary");
};

export const getMonthly = async () => {
  return await api.get("/expenses/monthly");
};

export const getCategory = async (category) => {
  return await api.get(`/expenses/category/${category}`);
};

export const downloadPdfReport = async () => {
  return await api.get("/expenses/report/pdf", {
    responseType: "blob",
  });
};

export const uploadReceipt = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await api.post(`/expenses/${id}/receipt`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};