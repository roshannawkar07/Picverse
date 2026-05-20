import api from "../../../features/shared/services/api";

// Login
export async function login(username, password) {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
}

// Register
export async function register(username, email, password) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

// Get Me
export async function getMe() {
  const response = await api.get("/auth/get-me");

  return response.data;
}
