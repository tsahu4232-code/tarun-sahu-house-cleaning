import axios from "axios";
import { API_BASE_URL } from "./serviceHelpers";

export const adminLogin = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/admin-login`, {
    email,
    password,
  });

  localStorage.setItem("adminToken", res.data.token);
  return res.data;
};

export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};

export const isAdminLoggedIn = () => {
  return Boolean(localStorage.getItem("adminToken"));
};
