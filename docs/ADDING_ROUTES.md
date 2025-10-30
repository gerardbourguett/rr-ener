# Cómo Agregar Nuevas Rutas

Guía paso a paso para agregar rutas protegidas al sistema.

## 🚀 Inicio Rápido

### Paso 1: Crear el Archivo de Ruta

```typescript
// app/routes/dashboard/usuarios.tsx
import type { Route } from "./+types/usuarios";

export function meta() {
  return [
    { title: "Usuarios - Enerlova" },
    { name: "description", content: "Gestión de usuarios" },
  ];
}

export default function Usuarios({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData; // Usuario del layout padre

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
      {/* Tu contenido aquí */}
    </div>
  );
}
```

### Paso 2: Registrar en routes.ts

```typescript
// app/routes.ts
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("dashboard", [
    route("usuarios", "routes/dashboard/usuarios.tsx"), // ← Agregar aquí
  ]),
]),
```

### Paso 3: Agregar al Sidebar

```typescript
// app/components/sidebar/app-sidebar.tsx
const data = {
  navMain: [
    {
      title: "Administración",
      icon: Users,
      items: [
        {
          title: "Usuarios",
          url: "/dashboard/usuarios", // ← Debe coincidir con la ruta
        },
      ],
    },
  ],
};
```

¡Listo! Ya tienes `/dashboard/usuarios` con:

- ✅ Autenticación automática
- ✅ Sidebar y header incluidos
- ✅ Acceso a `user` en `loaderData`

## 📋 Estructura Recomendada

### Para Módulos Simples

```
app/routes/
└── dashboard/
    ├── usuarios.tsx          # /dashboard/usuarios
    ├── contratos.tsx         # /dashboard/contratos
    └── medidores.tsx         # /dashboard/medidores
```

### Para Módulos con Sub-rutas

```
app/routes/
└── dashboard/
    └── admin/
        ├── layout.tsx        # Layout compartido
        ├── usuarios.tsx      # /dashboard/admin/usuarios
        └── roles.tsx         # /dashboard/admin/roles
```

## 🎨 Templates de Rutas

### Template Básico

```typescript
import type { Route } from "./+types/mi-ruta";

export function meta() {
  return [{ title: "Mi Página - Enerlova" }];
}

export default function MiRuta({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Mi Página</h1>
      <p>Contenido aquí</p>
    </div>
  );
}
```

### Template con Datos del Backend

```typescript
import type { Route } from "./+types/mi-ruta";
import { getAuthHeader } from "~/services/auth";

export async function clientLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/mi-endpoint`, {
    headers: {
      ...getAuthHeader(), // Incluye token JWT
    },
  });

  const data = await response.json();
  return { data };
}

export default function MiRuta({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1>Mi Data: {data.nombre}</h1>
    </div>
  );
}
```

### Template con Formulario

```typescript
import { Form } from "react-router";
import type { Route } from "./+types/mi-ruta";
import { getAuthHeader } from "~/services/auth";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const nombre = formData.get("nombre");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ nombre }),
  });

  return { success: response.ok };
}

export default function MiRuta() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Form method="post">
        <input type="text" name="nombre" required />
        <button type="submit">Guardar</button>
      </Form>
    </div>
  );
}
```

### Template con ErrorBoundary

```typescript
import { useRouteError, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/mi-ruta";

export function ErrorBoundary() {
  const error = useRouteError();

  let message = "Error desconocido";

  if (isRouteErrorResponse(error)) {
    message = `Error ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default function MiRuta() {
  // ...
}
```

## 🔒 Rutas con Permisos Especiales

Si necesitas verificar permisos específicos:

```typescript
import { redirect } from "react-router";
import { getUser } from "~/services/auth";
import type { Route } from "./+types/admin";

export async function clientLoader() {
  const user = getUser();

  // Verificar role específico
  if (!user?.roles.includes("Administrador")) {
    throw redirect("/"); // Redirect si no tiene permiso
  }

  return { user };
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  return <div>Panel de Administrador</div>;
}
```

## 📂 Organización Recomendada

### Por Módulo

```
app/routes/dashboard/
├── monitor/
│   ├── lecturas.tsx
│   └── exportar.tsx
├── operaciones/
│   ├── facturacion.tsx
│   └── precios.tsx
└── admin/
    ├── usuarios.tsx
    └── roles.tsx
```

### routes.ts Correspondiente

```typescript
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("dashboard", [
    ...prefix("monitor", [
      route("lecturas", "routes/dashboard/monitor/lecturas.tsx"),
      route("exportar", "routes/dashboard/monitor/exportar.tsx"),
    ]),
    ...prefix("operaciones", [
      route("facturacion", "routes/dashboard/operaciones/facturacion.tsx"),
      route("precios", "routes/dashboard/operaciones/precios.tsx"),
    ]),
    ...prefix("admin", [
      route("usuarios", "routes/dashboard/admin/usuarios.tsx"),
      route("roles", "routes/dashboard/admin/roles.tsx"),
    ]),
  ]),
]),
```

## ✅ Checklist

Cuando agregues una nueva ruta:

- [ ] Crear archivo en `app/routes/dashboard/`
- [ ] Agregar `meta()` con título
- [ ] Exportar componente default
- [ ] Registrar en `app/routes.ts`
- [ ] Agregar al sidebar en `app-sidebar.tsx`
- [ ] Probar navegación
- [ ] Verificar que aparezca en breadcrumbs
- [ ] Agregar ErrorBoundary si es necesario

## 🚨 Errores Comunes

### "Cannot find module '+types/...'"

**Solución:** React Router genera los tipos automáticamente al ejecutar `pnpm dev`. Espera unos segundos después de crear el archivo.

### La ruta no está protegida

**Solución:** Asegúrate de que esté dentro de `layout("routes/layout.tsx", [...])`

### No aparece en el sidebar

**Solución:** Verifica que la URL en `app-sidebar.tsx` coincida exactamente con la ruta definida

### ErrorBoundary no funciona

**Solución:** Asegúrate de exportarlo con `export function ErrorBoundary()` (no default export)

## 💡 Tips

1. **Usa clientLoader** para datos que necesites del backend
2. **Usa clientAction** para formularios y mutaciones
3. **ErrorBoundary** es opcional pero recomendado
4. **meta()** mejora SEO y experiencia de usuario
5. **Mantén consistencia** en nombres de archivos y rutas

## 📖 Referencias

- [Route Module API](https://reactrouter.com/start/framework/route-module)
- [Client Data Loading](https://reactrouter.com/how-to/client-data)
- [Form Actions](https://reactrouter.com/start/framework/actions)
