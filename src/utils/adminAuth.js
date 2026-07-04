import API from "../utils/axiosConfig";

export const adminLogin = async (email, password) => {
  const res = await API.post("/auth/admin-login", {
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