// src/services/api.ts
import axios from "axios";

// 🔗 utilise la variable d'environnement définie dans Netlify
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // fallback en local
  withCredentials: true,
});

// 👉 Ajoute automatiquement le token si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Auth services ===
export async function register(form: { name: string; email: string; password: string; role: string }) {
  const response = await api.post("/auth/register", form);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
}

export async function login(form: { email: string; password: string }) {
  const response = await api.post("/auth/login", form);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export default api;
