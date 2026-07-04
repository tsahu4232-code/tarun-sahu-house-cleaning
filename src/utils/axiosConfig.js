import axios from "axios";

// Attaches the admin token (if present) to every outgoing axios
// request. This lets existing components keep using plain `axios`
// without having to manually add the Authorization header everywhere.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// If the token is missing/expired, the backend replies 401.
// Clear the stale token so the admin gets sent back to the login page.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("adminToken");
    }
    return Promise.reject(error);
  }
);
