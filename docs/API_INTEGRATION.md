# Integración con API Backend

## 🔌 Configuración

### Variables de Entorno

```env
# .env
VITE_API_URL=http://192.168.1.139:8082
```

En el código:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

## 🔐 Autenticación

### Todos los requests autenticados deben incluir el token:

```typescript
import { getAuthHeader } from "~/services/auth";

const response = await fetch(`${API_URL}/endpoint`, {
  headers: {
    "Content-Type": "application/json",
    ...getAuthHeader(), // Agrega: Authorization: Bearer <token>
  },
});
```

## 📡 Endpoints Disponibles

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
  "token": "eyJhbGci..."
}
```

**Implementación:**
```typescript
import { login } from "~/services/auth";

const user = await login({
  usuario: "user@example.com",
  contrasena: "password123"
});
```

### 2. Obtener Perfil de Usuario

```http
GET /obtener/{userId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "idUsuario": 3,
  "nombreDeUsuario": "username",
  "perfilId": 1,
  "nombres": "Nombre",
  "apellidos": "Apellido",
  "departamento": 2,
  "activo": true,
  "fechaCreacion": "2025-06-26T18:01:12",
  "email": "user@example.com",
  "roles": ["Administrador"]
}
```

**Implementación:**
```typescript
import { getUserProfile } from "~/services/auth";

const profile = await getUserProfile(userId, token);
```

### 3. Forgot Password (Stub)

```http
POST /forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Implementación:**
```typescript
import { forgotPassword } from "~/services/auth";

await forgotPassword("user@example.com");
```

### 4. Reset Password (Stub)

```http
POST /reset-password
Content-Type: application/json

{
  "token": "reset-token",
  "newPassword": "newPassword123"
}
```

**Implementación:**
```typescript
import { resetPassword } from "~/services/auth";

await resetPassword(token, newPassword);
```

## 🛠️ Patrones de Uso

### GET Request (Simple)

```typescript
import type { Route } from "./+types/mi-ruta";
import { getAuthHeader } from "~/services/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function clientLoader() {
  const response = await fetch(`${API_URL}/usuarios`, {
    headers: getAuthHeader(),
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  
  const usuarios = await response.json();
  return { usuarios };
}

export default function Usuarios({ loaderData }: Route.ComponentProps) {
  const { usuarios } = loaderData;
  
  return (
    <div>
      {usuarios.map(u => <div key={u.id}>{u.nombre}</div>)}
    </div>
  );
}
```

### POST Request (Formulario)

```typescript
import { Form, redirect } from "react-router";
import type { Route } from "./+types/crear-usuario";
import { getAuthHeader } from "~/services/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
  };
  
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }
  
  throw redirect("/dashboard/usuarios");
}

export default function CrearUsuario() {
  return (
    <Form method="post">
      <input name="nombre" required />
      <input name="email" type="email" required />
      <button type="submit">Crear</button>
    </Form>
  );
}
```

### PUT/PATCH Request (Actualizar)

```typescript
export async function clientAction({ request, params }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const { id } = params;
  
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      nombre: formData.get("nombre"),
    }),
  });
  
  if (!response.ok) {
    throw new Error("Error al actualizar");
  }
  
  return { success: true };
}
```

### DELETE Request

```typescript
export async function clientAction({ params }: Route.ClientActionArgs) {
  const { id } = params;
  
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  
  if (!response.ok) {
    throw new Error("Error al eliminar");
  }
  
  throw redirect("/dashboard/usuarios");
}
```

## 🔄 Manejo de Errores

### Patrón Try-Catch

```typescript
export async function clientLoader() {
  try {
    const response = await fetch(`${API_URL}/data`, {
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado o inválido
        throw redirect("/auth/login");
      }
      
      const error = await response.json();
      throw new Error(error.message || "Error en la petición");
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 });
    }
    throw error;
  }
}

// ErrorBoundary captura el error
export function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div>
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : "Error desconocido"}</p>
    </div>
  );
}
```

### Validación de Response

```typescript
async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: getAuthHeader(),
  });
  
  if (!response.ok) {
    // Manejo específico por código de error
    switch (response.status) {
      case 401:
        throw redirect("/auth/login");
      case 403:
        throw new Response("No tienes permiso", { status: 403 });
      case 404:
        throw new Response("No encontrado", { status: 404 });
      default:
        throw new Response("Error del servidor", { status: 500 });
    }
  }
  
  return response.json();
}

// Uso
export async function clientLoader() {
  const usuarios = await fetchData<Usuario[]>("/usuarios");
  return { usuarios };
}
```

## 📦 Helper Function para API

Puedes crear un helper reutilizable:

```typescript
// app/lib/api.ts
import { getAuthHeader } from "~/services/auth";

const API_URL = import.meta.env.VITE_API_URL;

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { auth = true, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };
  
  if (auth) {
    Object.assign(headers, getAuthHeader());
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// Helpers específicos
export const api = {
  get: <T>(endpoint: string) => apiCall<T>(endpoint),
  
  post: <T>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  put: <T>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  patch: <T>(endpoint: string, data: unknown) =>
    apiCall<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  
  delete: <T>(endpoint: string) =>
    apiCall<T>(endpoint, { method: "DELETE" }),
};
```

**Uso del Helper:**

```typescript
import { api } from "~/lib/api";

// GET
export async function clientLoader() {
  const usuarios = await api.get<Usuario[]>("/usuarios");
  return { usuarios };
}

// POST
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  
  const result = await api.post("/usuarios", {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
  });
  
  return { result };
}

// DELETE
const handleDelete = async (id: number) => {
  await api.delete(`/usuarios/${id}`);
  window.location.reload(); // O mejor: usar revalidator
};
```

## 🔄 Revalidación de Datos

Para actualizar datos sin recargar la página:

```typescript
import { useRevalidator } from "react-router";

export default function MiComponente() {
  const revalidator = useRevalidator();
  
  const handleUpdate = async () => {
    await api.patch("/usuarios/1", { nombre: "Nuevo nombre" });
    revalidator.revalidate(); // Re-ejecuta el loader
  };
  
  return <button onClick={handleUpdate}>Actualizar</button>;
}
```

## 🌐 URLs de Backend

### Desarrollo
```
http://192.168.1.139:8082
```

### Producción (UAT)
```
http://192.168.1.139:8081
```

## ⚙️ Cambiar entre Ambientes

```typescript
// .env.development
VITE_API_URL=http://192.168.1.139:8082

// .env.production
VITE_API_URL=http://192.168.1.139:8081
```

## 💡 Mejores Prácticas

1. ✅ **Siempre usa `getAuthHeader()`** para requests autenticados
2. ✅ **Maneja errores 401** redirigiendo a login
3. ✅ **Valida responses** antes de usarlas
4. ✅ **Usa TypeScript** para tipar responses
5. ✅ **Crea helpers reutilizables** para llamadas comunes
6. ✅ **Usa ErrorBoundary** para mostrar errores al usuario
7. ✅ **Implementa loading states** para mejor UX
8. ⚠️ **No hardcodees URLs** - usa variables de entorno

## 📚 Referencias

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Router Data Loading](https://reactrouter.com/start/framework/data-loading)
- [React Router Actions](https://reactrouter.com/start/framework/actions)

