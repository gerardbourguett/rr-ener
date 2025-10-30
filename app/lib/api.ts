import { redirect } from "react-router";
import { getAuthHeader, getUser, removeUser } from "~/services/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://192.168.1.139:8082";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * Autenticación y autorización
 * - Si requireAuth es true, se agrega el token de autenticación al header Authorization
 */
export async function apiFetch<T = any>(
  endpoints: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = true, headers = {}, ...restOptions } = options;

  // Headers comunes para todas las peticiones
  const fetchHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (requireAuth) {
    const user = getUser();
    if (!user) {
      throw redirect("/auth/login");
    }
    Object.assign(fetchHeaders, getAuthHeader());
  }

  // Construir la URL completa
  const url = endpoints.startsWith("http")
    ? endpoints
    : `${API_BASE_URL}${endpoints}`;

  const response = await fetch(url, {
    ...restOptions,
    headers: fetchHeaders,
  });
  // Verificar si el usuario está autenticado
  if (response.status === 401) {
    removeUser();
    throw redirect("/auth/login");
  }

  // Manejar errores de la API
  if (!response.ok) {
    const errorMessage = await response
      .text()
      .catch(() => "Error desconocido al realizar la petición");
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  return response.json();
}

/**
 * Métodos HTTP comunes para la API
 */
export const api = {
  get: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),

  patch: <T = any>(endpoint: string, data?: any, options?: FetchOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  head: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "HEAD" }),
  options: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "OPTIONS" }),
  trace: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "TRACE" }),
  connect: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "CONNECT" }),
  purge: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "PURGE" }),
  search: <T = any>(endpoint: string, options?: FetchOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "SEARCH" }),
};
