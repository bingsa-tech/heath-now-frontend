// src/services/api.js
import axios from "axios";

// Utilise la variable Netlify (VITE_API_URL) ou le fallback local
// ⚠️ En prod, règle VITE_API_URL = "https://health-now-gitspace.onrender.com/api"
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// ---- Interceptor: injecte automatiquement le token ----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Interceptor: gère 401/403 (token expiré/invalide) ----
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionnel : tu peux décommenter pour forcer une redirection
      // if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
      //   window.location.assign("/login");
      // }
    }
    return Promise.reject(error);
  }
);

// ---- Helpers ----
function persistAuth(data) {
  if (data?.token) localStorage.setItem("token", data.token);
  if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
}

// ---- Services Auth ----
export async function register(form) {
  // ✅ baseURL inclut déjà /api → on appelle directement /auth/...
  const { data } = await api.post("/auth/register", form);
  persistAuth(data);
  return data;
}

export async function login(form) {
  const { data } = await api.post("/auth/login", form);
  persistAuth(data);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");
  return data.user || data; // selon ton backend
}

// ---- Utilitaires ----
export function getUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export default api;
