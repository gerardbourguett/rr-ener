# Simplificación con React Router v7

## 🎯 Objetivo

Aprovechar las características nativas de React Router v7 para eliminar abstracciones innecesarias y código duplicado.

## ✅ Cambios Realizados

### 1. ❌ Eliminado: Error Boundary Custom

**Antes (117 líneas):**

```typescript
// app/components/error-boundary.tsx
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error }) => {
  // ... 117 líneas de código custom
};
```

**Ahora:**

```typescript
// En cualquier ruta (routes/layout.tsx)
export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "Ha ocurrido un error";
  if (isRouteErrorResponse(error)) {
    errorMessage = `Error ${error.status}`;
  }

  return <div>{errorMessage}</div>;
}
```

**Beneficios:**

- ✅ Usa `ErrorBoundary` nativo de React Router
- ✅ Menos código que mantener
- ✅ Mejor integración con el router

### 2. ❌ Eliminado: Auth Context Inexistente

**Problema:** Componentes intentaban usar `useAuth()` de un Context que no existía.

**Antes:**

```typescript
// ❌ Error - Context no existe
import { useAuth } from "~/context/AuthContext";
const { user, logout } = useAuth();
```

**Ahora:**

```typescript
// ✅ Directo de localStorage
import { getUser, removeUser } from "~/services/auth";

const user = getUser();
const logout = () => {
  removeUser();
  navigate("/auth/login");
};
```

**Beneficios:**

- ✅ Sin Context API innecesario
- ✅ Código más directo y simple
- ✅ Funciona perfecto para SPA

### 3. ❌ Eliminado: protected-route.tsx

**Problema:** Tenía bugs y era redundante.

**Antes (29 líneas con bugs):**

```typescript
// routes/protected-route.tsx
const ProtectedRoute = () => {
  const isAuth = isAuthenticated();
  const [loading, setLoading] = useState(isAuth ? false : true);

  // BUG: Lógica invertida
  if (isAuth && !loading) {
    return <MoonLoader />; // Muestra loader cuando debería mostrar contenido
  }

  // BUG: Falta () en isAuthenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
```

**Ahora:**

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

**Beneficios:**

- ✅ Sin bugs
- ✅ Más simple y directo
- ✅ Patrón estándar de React Router

### 4. ✨ Simplificado: Componentes de Sidebar

#### site-header.tsx

**Antes:**

```typescript
import { useAuth } from "~/context/AuthContext"; // ❌ No existe
import { useBreadcrumbs } from "~/context/BreadcrumbContext"; // ❌ No existe

const { user } = useAuth();
const { breadcrumbItems } = useBreadcrumbs();
```

**Ahora:**

```typescript
import { getUser } from "~/services/auth"; // ✅

const user = getUser();
// breadcrumbItems viene como prop
```

#### nav-user.tsx

**Antes:**

```typescript
import { useAuth } from "~/context/AuthContext"; // ❌

const { logout } = useAuth();
await logout(); // ❌ No existe
```

**Ahora:**

```typescript
import { removeUser } from "~/services/auth"; // ✅

const handleSignOut = () => {
  removeUser();
  navigate("/auth/login");
};
```

#### app-sidebar.tsx

**Antes:**

```typescript
import { useAuth } from "~/context/AuthContext"; // ❌
import { useDebounce } from "~/hooks/shared/use-debounce"; // ❌ Extra

const { canView } = useAuth();
const debouncedSearch = useDebounce(searchTerm, 300);

// Filtrado con permisos
if (!canView(item.url)) return false;
```

**Ahora:**

```typescript
// Solo useState - más simple
const [searchTerm, setSearchTerm] = useState("");

// Filtrado solo por búsqueda (permisos se pueden agregar después)
return item.title.toLowerCase().includes(searchTerm.toLowerCase());
```

### 5. 🏗️ Simplificado: Estructura de Rutas

**Antes (Confuso):**

```typescript
layout("routes/protected-route.tsx", [    // ❌ Redundante
  layout("routes/layout.tsx", [           // ❌ Doble protección
    ...prefix("dashboard", [
      index("routes/home.tsx")            // ❌ /dashboard en vez de /
    ]),
  ]),
]),
```

**Ahora (Claro):**

```typescript
layout("routes/layout.tsx", [            // ✅ Una sola protección
  index("routes/home.tsx"),              // ✅ / directamente
  ...prefix("dashboard", [               // ✅ /dashboard/* para módulos
    // route("usuarios", "..."),
  ]),
]),
```

## 📊 Resumen de Mejoras

| Cambio          | Antes                   | Ahora                  | Beneficio              |
| --------------- | ----------------------- | ---------------------- | ---------------------- |
| Error Boundary  | 117 líneas custom       | Nativo de React Router | -117 líneas            |
| Auth Context    | useAuth() inexistente   | getUser() directo      | Sin Context API        |
| Protected Route | 29 líneas con bugs      | clientLoader           | -29 líneas             |
| site-header.tsx | 2 contexts inexistentes | getUser() + props      | Más simple             |
| nav-user.tsx    | useAuth()               | removeUser()           | Directo                |
| app-sidebar.tsx | canView() inexistente   | Filtrado simple        | Sin permisos por ahora |

**Total:** ~190 líneas eliminadas + bugs corregidos

## 💡 Patrones Simplificados

### Autenticación

```typescript
// ✅ Patrón simple
import { getUser, removeUser } from "~/services/auth";

// En componentes
const user = getUser();

// En logout
removeUser();
navigate("/auth/login");
```

### Rutas Protegidas

```typescript
// ✅ Un solo clientLoader en layout.tsx
export async function clientLoader() {
  const user = getUser();
  if (!user) throw redirect("/auth/login");
  return { user };
}
```

### Error Handling

```typescript
// ✅ ErrorBoundary nativo en cada ruta
export function ErrorBoundary() {
  const error = useRouteError();
  return <ErrorPage error={error} />;
}
```

## 🚀 Si Necesitas Más Adelante...

### Agregar Sistema de Permisos

```typescript
// lib/permissions.ts
export function canView(route: string, user: User | null): boolean {
  if (!user) return false;

  const adminRoutes = ["/dashboard/configuracion"];
  if (adminRoutes.some((r) => route.startsWith(r))) {
    return user.roles.includes("Administrador");
  }

  return true;
}

// En app-sidebar.tsx
import { canView } from "~/lib/permissions";

const filteredItems = section.items.filter((item) => {
  const user = getUser();
  return canView(item.url, user);
});
```

### Agregar Breadcrumbs Dinámicos

```typescript
// Pasa como prop desde cada ruta
<SiteHeader
  breadcrumbItems={[
    { label: "Admin", href: "/dashboard/admin" },
    { label: "Usuarios" },
  ]}
/>
```

## 📖 Lecciones Aprendidas

1. **Usa características nativas primero** - React Router v7 ya tiene lo que necesitas
2. **Evita abstracciones innecesarias** - Context API solo cuando realmente lo necesites
3. **localStorage es suficiente para SPA** - No necesitas Context para compartir estado de auth
4. **Lee la documentación** - React Router v7 tiene mejores patrones que implementaciones custom
5. **Menos código = menos bugs** - Más simple es mejor

## ✨ Resultado

- **Código más limpio:** -190 líneas
- **Más mantenible:** Usa características nativas
- **Más simple:** Sin Context API innecesario
- **Sin bugs:** Eliminamos código con errores
- **Mejor rendimiento:** Menos abstracciones = más rápido

¡Simplificado y funcionando! 🎉
