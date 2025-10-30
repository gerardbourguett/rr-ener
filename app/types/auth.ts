export interface User {
  idUsuario: number;
  nombreDeUsuario: string;
  perfilId: number;
  nombres: string;
  apellidos: string;
  departamento: number;
  activo: boolean;
  fechaCreacion: string;
  email: string;
  roles: string[];
  token: string; // the JWT itself for API calls
  exp: number; // expiration timestamp from JWT
}

export interface LoginResponse {
  token: string;
}

export interface LoginCredentials {
  usuario: string;
  contrasena: string;
}

export interface JWTPayload {
  sub: string;
  name: string;
  NombreUsuario: string;
  exp: number;
  role: string;
  iss: string;
  aud: string;
}

export interface UserProfile {
  idUsuario: number;
  nombreDeUsuario: string;
  perfilId: number;
  nombres: string;
  apellidos: string;
  departamento: number;
  activo: boolean;
  fechaCreacion: string;
  email: string;
  roles: string[];
}
