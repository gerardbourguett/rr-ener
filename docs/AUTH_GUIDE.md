# Guía de Autenticación - Sistema Enerlova

## 🔐 Overview

El sistema usa autenticación JWT con almacenamiento en localStorage, optimizado para Single Page Applications (SPA).

## 🎯 Flujo Completo de Autenticación

### 1. Login

```
Usuario → /auth/login
  ↓
Ingresa credenciales (email + contraseña)
  ↓
POST /Login → Backend
  ↓
Backend retorna { token: "eyJhbGci..." }
  ↓
Decodifica JWT → extrae userId (sub)
  ↓
GET /obtener/{userId} → Backend
  ↓
Backend retorna perfil completo del usuario
  ↓
Guarda en localStorage: { ...perfil, token, exp }
  ↓
Redirect a "/"
```

### 2. Acceso a Rutas Protegidas

```
Usuario visita cualquier ruta
  ↓
layout.tsx → clientLoader ejecuta
  ↓
getUser() desde localStorage
  ↓
¿Usuario existe y token válido?
  ↓ NO          ↓ SÍ
  ↓             ↓
redirect        Renderiza la ruta
/auth/login     + pasa user a loaderData
```

### 3. Logout

```
Usuario click "Cerrar Sesión"
  ↓
POST /logout
  ↓
removeUser() → limpia localStorage
  ↓
Redirect a /auth/login
```

## 📦 Estructura de Datos

### JWT Token (del backend)

```json
{
  "sub": "3", // ID del usuario
  "name": "Gbourguett",
  "NombreUsuario": "Gerard",
  "exp": 1761836237, // Timestamp de expiración
  "role": "Administrador",
  "iss": "Fi_Enerlova_2025",
  "aud": "Fi_Enerlova_2025Users"
}
```

### Perfil de Usuario (del backend)

```json
{
  "idUsuario": 3,
  "nombreDeUsuario": "Gbourguett",
  "perfilId": 1,
  "nombres": "Gerard",
  "apellidos": "Bourguett",
  "departamento": 2,
  "activo": true,
  "fechaCreacion": "2025-06-26T18:01:12",
  "email": "gbourguett@lovalledor.cl",
  "roles": ["Administrador"]
}
```

### Objeto en localStorage

```json
{
  "idUsuario": 3,
  "nombreDeUsuario": "Gbourguett",
  "perfilId": 1,
  "nombres": "Gerard",
  "apellidos": "Bourguett",
  "departamento": 2,
  "activo": true,
  "fechaCreacion": "2025-06-26T18:01:12",
  "email": "gbourguett@lovalledor.cl",
  "roles": ["Administrador"],
  "token": "eyJhbGci...", // JWT completo
  "exp": 1761836237 // Expiración del token
}
```

**Key:** `enerlova_user`

## 🛠️ API del Servicio de Autenticación

### Funciones Disponibles

```typescript
import {
  // Auth
  login, // (credentials) => Promise<User>
  removeUser, // () => void

  // Obtener datos
  getUser, // () => User | null
  isAuthenticated, // () => boolean

  // API helpers
  getAuthHeader, // () => { Authorization: "Bearer ..." }
  refreshUserProfile, // () => Promise<User | null>

  // Password recovery (stubs)
  forgotPassword, // (email) => Promise<void>
  resetPassword, // (token, newPassword) => Promise<void>
} from "~/services/auth";
```

### Ejemplos de Uso

#### Login

```typescript
import { login } from "~/services/auth";

try {
  const user = await login({
    usuario: "user@example.com",
    contrasena: "password123",
  });

  // Usuario guardado automáticamente en localStorage
  navigate("/");
} catch (error) {
  console.error(error.message); // "Credenciales inválidas"
}
```

#### Obtener Usuario Actual

```typescript
import { getUser } from "~/services/auth";

const user = getUser();

if (user) {
  console.log(`Hola ${user.nombres}!`);
} else {
  console.log("No hay usuario autenticado");
}
```

#### Logout

```typescript
import { removeUser } from "~/services/auth";
import { useNavigate } from "react-router";

const navigate = useNavigate();

const handleLogout = () => {
  removeUser();
  navigate("/auth/login", { replace: true });
};
```

#### Llamadas API Autenticadas

```typescript
import { getAuthHeader } from "~/services/auth";

const response = await fetch(`${API_URL}/data`, {
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeader(), // Agrega: Authorization: Bearer <token>
  },
});
```

## 🔒 Protección de Rutas

### Método Automático (Recomendado)

Usa el `clientLoader` del layout:

```typescript
// routes/layout.tsx
export async function clientLoader() {
  const user = getUser();

  if (!user) {
    throw redirect("/auth/login");
  }

  return { user };
}
```

Todas las rutas dentro de este layout están protegidas automáticamente.

### Método Manual (Si necesitas lógica especial)

```typescript
// En una ruta específica
import { getUser } from "~/services/auth";
import { redirect } from "react-router";

export async function clientLoader() {
  const user = getUser();

  if (!user) {
    throw redirect("/auth/login");
  }

  // Lógica adicional específica de esta ruta
  if (!user.roles.includes("Admin")) {
    throw redirect("/forbidden");
  }

  return { user };
}
```

## 🌐 Endpoints del Backend

### 1. Login

```http
POST /Login
Content-Type: application/json

{
  "usuario": "user@example.com",
  "contrasena": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Obtener Perfil

```http
GET /obtener/{userId}
Authorization: Bearer eyJhbGci...
```

**Response:**

```json
{
  "idUsuario": 3,
  "nombreDeUsuario": "Gbourguett",
  "nombres": "Gerard",
  "apellidos": "Bourguett",
  "email": "user@example.com",
  "roles": ["Administrador"],
  ...
}
```

### 3. Forgot Password (Stub)

```http
POST /forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### 4. Reset Password (Stub)

```http
POST /reset-password
Content-Type: application/json

{
  "token": "reset-token-here",
  "newPassword": "newPassword123"
}
```

## 🔐 Seguridad

### ✅ Implementado

- JWT validation en cada request
- Token expiration check
- Redirect automático si token expirado
- Bearer token en headers de API
- Validación server-side del token

### ⚠️ Consideraciones SPA

**localStorage es accesible a JavaScript:**

- Vulnerable a XSS (Cross-Site Scripting)
- Sanitiza SIEMPRE los inputs del usuario
- Usa Content Security Policy (CSP)

**Mejores prácticas:**

- ✅ Usa HTTPS en producción
- ✅ Implementa rate limiting en el backend
- ✅ Valida JWT en CADA request del backend
- ✅ Usa tokens con expiración corta
- ⚠️ Considera implementar refresh tokens

## 🐛 Debugging

### Ver datos de sesión

```javascript
// En DevTools Console
const user = JSON.parse(localStorage.getItem("enerlova_user"));
console.log(user);
```

### Limpiar sesión manualmente

```javascript
// En DevTools Console
localStorage.removeItem("enerlova_user");
// Luego refresca la página
```

### Verificar autenticación

```typescript
import { isAuthenticated, getUser } from "~/services/auth";

console.log("Authenticated:", isAuthenticated());
console.log("User:", getUser());
```

### Verificar expiración del token

```typescript
const user = getUser();
if (user) {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = user.exp - now;
  console.log(`Token expira en ${timeLeft} segundos`);
}
```

## 📚 Referencias

- [JWT.io](https://jwt.io) - Decodificar y validar JWTs
- [React Router Auth Tutorial](https://reactrouter.com/how-to/middleware#authentication)
