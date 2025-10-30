import type {
  LoginCredentials,
  LoginResponse,
  JWTPayload,
  User,
  UserProfile,
} from "~/types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://192.168.1.139:8082";

const STORAGE_KEY = "enerlova_user";

/**
 * Decode JWT token payload
 */
function decodeJWT(token: string): JWTPayload {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    // Decode base64url (replace URL-safe chars and add padding)
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch {
    throw new Error("Failed to decode JWT token");
  }
}

/**
 * Get complete user profile from API
 */
export async function getUserProfile(
  userId: string,
  token: string
): Promise<UserProfile> {
  try {
    const response = await fetch(`${API_BASE_URL}/obtener/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener perfil de usuario");
    }

    const profile: UserProfile = await response.json();
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al obtener perfil de usuario");
  }
}

/**
 * Login user with credentials
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    // Step 1: Login and get JWT token
    const response = await fetch(`${API_BASE_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciales inválidas");
      }
      throw new Error("Error al iniciar sesión");
    }

    const data: LoginResponse = await response.json();

    if (!data.token) {
      throw new Error("No se recibió token de autenticación");
    }

    // Step 2: Decode the JWT to get user ID and expiration
    const payload = decodeJWT(data.token);

    // Step 3: Fetch complete user profile
    const profile = await getUserProfile(payload.sub, data.token);

    // Step 4: Combine profile data with token info
    const user: User = {
      ...profile,
      token: data.token,
      exp: payload.exp,
    };

    // Step 5: Store user in localStorage
    saveUser(user);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error de conexión con el servidor");
  }
}

/**
 * Verify if JWT token is still valid
 */
export function isTokenValid(user: User): boolean {
  if (!user.exp) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  return user.exp > now;
}

/**
 * Save user to localStorage
 */
export function saveUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

/**
 * Get user from localStorage
 */
export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    const user = JSON.parse(stored) as User;

    // Check if token is still valid
    if (!isTokenValid(user)) {
      removeUser();
      return null;
    }

    return user;
  } catch {
    removeUser();
    return null;
  }
}

/**
 * Remove user from localStorage (logout)
 */
export function removeUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const user = getUser();
  return user !== null;
}

/**
 * Get authorization header for API calls
 */
export function getAuthHeader(): Record<string, string> {
  const user = getUser();
  if (!user) {
    return {};
  }

  return {
    Authorization: `Bearer ${user.token}`,
  };
}

/**
 * Refresh user profile from API
 * Useful for updating user data without requiring re-login
 */
export async function refreshUserProfile(): Promise<User | null> {
  const currentUser = getUser();

  if (!currentUser) {
    return null;
  }

  try {
    const profile = await getUserProfile(
      String(currentUser.idUsuario),
      currentUser.token
    );

    const updatedUser: User = {
      ...profile,
      token: currentUser.token,
      exp: currentUser.exp,
    };

    saveUser(updatedUser);
    return updatedUser;
  } catch (error) {
    // If refresh fails, keep current user data
    console.error("Failed to refresh user profile:", error);
    return currentUser;
  }
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Error al solicitar recuperación de contraseña");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al solicitar recuperación de contraseña");
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      throw new Error("Error al restablecer contraseña");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al restablecer contraseña");
  }
}
