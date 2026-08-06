import api from "./api";

export const registerUser = async (user) => {
  return await api.post("/auth/register", user);
};

export const loginUser = async (user) => {
  return await api.post("/auth/login", user);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};