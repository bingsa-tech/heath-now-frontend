import api from "./api";

export async function register(payload: { name: string; email: string; password: string; role?: string }) {
  const { data } = await api.post("/auth/register", payload);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post("/auth/login", payload);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
