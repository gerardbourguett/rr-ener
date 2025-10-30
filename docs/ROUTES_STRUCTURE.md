# Estructura de Rutas - React Router v7

## 📋 Configuración Actual

```typescript
// app/routes.ts
export default [
  // Auth routes (públicas)
  ...prefix("auth", [
    layout("routes/auth/layout.tsx", [
      route("login", "routes/auth/login.tsx"),
      route("forgot-password", "routes/auth/forgot-password.tsx"),
      route("reset-password", "routes/auth/reset-password.tsx"),
    ]),
  ]),

  // Logout (público pero redirige)
  route("logout", "routes/logout.tsx"),

  // Dashboard (protegido con clientLoader en layout.tsx)
  layout("routes/layout.tsx", [
    index("routes/home.tsx"), // Ruta raíz "/"
    ...prefix("dashboard", [
      // Aquí irán las rutas del dashboard
    ]),
  ]),

  // 404
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
```

## 🗺️ Mapeo de Rutas

### Rutas Públicas

| URL                     | Archivo                           | Descripción          |
| ----------------------- | --------------------------------- | -------------------- |
| `/auth/login`           | `routes/auth/login.tsx`           | Página de login      |
| `/auth/forgot-password` | `routes/auth/forgot-password.tsx` | Recuperar contraseña |
| `/auth/reset-password`  | `routes/auth/reset-password.tsx`  | Resetear contraseña  |
| `/logout`               | `routes/logout.tsx`               | Cerrar sesión        |

### Rutas Protegidas

| URL            | Archivo           | Descripción           |
| -------------- | ----------------- | --------------------- |
| `/`            | `routes/home.tsx` | Dashboard principal   |
| `/dashboard/*` | (por agregar)     | Módulos del dashboard |

## 🔒 Protección de Rutas

### Layout con Autenticación

El archivo `routes/layout.tsx` protege TODAS las rutas anidadas:

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

- ✅ Una sola verificación para todas las rutas protegidas
- ✅ No necesitas verificar auth en cada ruta hija
- ✅ Código DRY (Don't Repeat Yourself)

### Flujo de Autenticación

```
Usuario visita "/"
  ↓
layout.tsx clientLoader ejecuta
  ↓
¿Tiene usuario en localStorage?
  ↓ NO          ↓ SÍ
  ↓             ↓
redirect        Renderiza layout + children
a /auth/login   (Sidebar + SiteHeader + home.tsx)
```

## 🏗️ Estructura de Layouts

### Layout Principal (routes/layout.tsx)

```typescript
<SidebarProvider>
  <AppSidebar variant="inset" />
  <SidebarInset>
    <SiteHeader />
    <div className="flex flex-1 flex-col">
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  </SidebarInset>
</SidebarProvider>
```

**Componentes:**

- `SidebarProvider` - Context para sidebar
- `AppSidebar` - Menú lateral de navegación
- `SiteHeader` - Header con breadcrumbs y user menu
- `Outlet` - Renderiza la ruta hija actual

### Layout de Auth (routes/auth/layout.tsx)

Layout especial para páginas de autenticación con:

- Panel dividido (branded + formulario)
- Logo de la empresa
- Animaciones de entrada
- Responsive design

## 📝 Agregar Nueva Ruta Protegida

### Opción 1: Ruta Simple

```typescript
// En routes.ts
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  route("usuarios", "routes/usuarios.tsx"), // Nueva ruta
]),
```

Esto crea `/usuarios`

### Opción 2: Rutas Anidadas

```typescript
// En routes.ts
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("dashboard", [
    route("usuarios", "routes/dashboard/usuarios.tsx"),
    route("contratos", "routes/dashboard/contratos.tsx"),
  ]),
]),
```

Esto crea `/dashboard/usuarios` y `/dashboard/contratos`

### Opción 3: Ruta con Sub-layout

```typescript
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("admin", [
    layout("routes/admin/layout.tsx", [
      route("usuarios", "routes/admin/usuarios.tsx"),
      route("roles", "routes/admin/roles.tsx"),
    ]),
  ]),
]),
```

Esto crea `/admin/usuarios` y `/admin/roles` con un layout adicional

## 🎯 Ejemplo Completo: Agregar Módulo de Usuarios

### 1. Crear el archivo de ruta

```typescript
// app/routes/dashboard/usuarios.tsx
import type { Route } from "./+types/usuarios";

export function meta() {
  return [{ title: "Usuarios - Enerlova" }];
}

export default function Usuarios({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData; // Usuario viene del layout padre

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
      {/* Tu contenido aquí */}
    </div>
  );
}
```

### 2. Actualizar routes.ts

```typescript
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("dashboard", [
    route("usuarios", "routes/dashboard/usuarios.tsx"), // ← Agregar
  ]),
]),
```

### 3. Agregar al sidebar

```typescript
// app/components/sidebar/app-sidebar.tsx
{
  title: "Administración",
  icon: Users,
  items: [
    {
      title: "Usuarios",
      url: "/dashboard/usuarios", // ← Debe coincidir con la ruta
    },
  ],
}
```

¡Listo! Ya tienes `/dashboard/usuarios` funcionando con:

- ✅ Protección automática por `layout.tsx`
- ✅ Sidebar y header incluidos
- ✅ Usuario disponible en `loaderData`

## 🚨 Errores Comunes

### Error: "No route matches URL"

**Causa:** La URL no está definida en `routes.ts`

**Solución:** Verifica que la ruta esté agregada correctamente

### Error: "Cannot find module '+types/...'"

**Causa:** React Router aún no ha generado los tipos

**Solución:** Ejecuta `pnpm dev` y espera a que se generen

### Ruta no protegida

**Causa:** La ruta está fuera del `layout("routes/layout.tsx")`

**Solución:** Mueve la ruta dentro del layout protegido

## 💡 Mejores Prácticas

1. **Agrupa rutas relacionadas** usando `prefix`
2. **Usa index para rutas principales** (`index("routes/home.tsx")`)
3. **Mantén la estructura de archivos** similar a la estructura de URLs
4. **Un layout por nivel** de jerarquía
5. **Nombres descriptivos** para archivos de rutas

## 📖 Referencias

- [React Router Route Config](https://reactrouter.com/start/framework/routing)
- [Nested Routes](https://reactrouter.com/start/framework/routing#nested-routes)
- [Index Routes](https://reactrouter.com/start/framework/routing#index-routes)
