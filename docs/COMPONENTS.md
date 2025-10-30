# Documentación de Componentes

## 🎨 Componentes de Autenticación

### LoginForm

**Ubicación:** `app/components/auth/login-form.tsx`

**Descripción:** Formulario de inicio de sesión con soporte para tema claro/oscuro.

**Props:** Ninguna

**Uso:**

```typescript
import { LoginForm } from "~/components/auth/login-form";

export default function Login() {
  return <LoginForm />;
}
```

**Características:**

- ✅ Validación de campos
- ✅ Manejo de errores
- ✅ Loading state
- ✅ Toggle de contraseña visible/oculta
- ✅ Link a "Olvidé mi contraseña"
- ✅ Animaciones de entrada

### ForgotForm

**Ubicación:** `app/components/auth/forgot-form.tsx`

**Descripción:** Formulario para recuperar contraseña.

**Props:** Ninguna

**Uso:**

```typescript
import { ForgotForm } from "~/components/auth/forgot-form";

export default function ForgotPassword() {
  return <ForgotForm />;
}
```

**Características:**

- ✅ Validación de email
- ✅ Mensaje de éxito
- ✅ Manejo de errores
- ✅ Link de regreso al login

### ResetForm

**Ubicación:** `app/components/auth/reset-form.tsx`

**Descripción:** Formulario para resetear contraseña con token.

**Props:**

```typescript
interface ResetFormProps {
  token?: string; // Token de recuperación desde URL
}
```

**Uso:**

```typescript
import { useSearchParams } from "react-router";
import { ResetForm } from "~/components/auth/reset-form";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return <ResetForm token={token || undefined} />;
}
```

**Características:**

- ✅ Validación de contraseña (mínimo 8 caracteres)
- ✅ Confirmación de contraseña
- ✅ Toggle de visibilidad de contraseñas
- ✅ Manejo de token inválido
- ✅ Redirect a login después de éxito

## 🗂️ Componentes de Sidebar

### AppSidebar

**Ubicación:** `app/components/sidebar/app-sidebar.tsx`

**Descripción:** Sidebar principal de navegación con búsqueda y secciones colapsables.

**Props:**

```typescript
interface AppSidebarProps {
  variant?: "sidebar" | "floating" | "inset";
}
```

**Uso:**

```typescript
import { AppSidebar } from "~/components/sidebar/app-sidebar";

<SidebarProvider>
  <AppSidebar variant="inset" />
  {/* Contenido */}
</SidebarProvider>;
```

**Estructura de datos:**

```typescript
const data = {
  navMain: [
    {
      title: "Sección",
      icon: IconComponent,
      items: [{ title: "Item", url: "/ruta" }],
    },
  ],
};
```

**Características:**

- ✅ Búsqueda en tiempo real
- ✅ Secciones colapsables
- ✅ Highlight de ruta activa
- ✅ NavUser integrado
- ✅ Responsive

### SiteHeader

**Ubicación:** `app/components/sidebar/site-header.tsx`

**Descripción:** Header con breadcrumbs, toggle de tema, y menú de usuario.

**Props:**

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
}
```

**Uso:**

```typescript
import { SiteHeader } from "~/components/sidebar/site-header";

export default function Layout() {
  return (
    <SiteHeader
      breadcrumbItems={[
        { label: "Admin", href: "/dashboard/admin" },
        { label: "Usuarios" },
      ]}
    />
  );
}
```

**Características:**

- ✅ Breadcrumbs dinámicos
- ✅ Badge de entorno (UAT/Core)
- ✅ Toggle de tema (dark/light)
- ✅ NavUser dropdown
- ✅ SidebarTrigger para mobile
- ✅ Responsive

### NavUser

**Ubicación:** `app/components/sidebar/nav-user.tsx`

**Descripción:** Dropdown de usuario con información y acciones.

**Props:**

```typescript
interface User {
  name: string;
  username: string;
  avatar: string;
  role: string;
}

interface NavUserProps {
  user: User;
}
```

**Uso:**

```typescript
import { NavUser } from "~/components/sidebar/nav-user";
import { getUser } from "~/services/auth";

const currentUser = getUser();

<NavUser
  user={{
    name: `${currentUser.nombres} ${currentUser.apellidos}`,
    username: currentUser.nombreDeUsuario,
    avatar: "",
    role: currentUser.roles[0] || "Usuario",
  }}
/>;
```

**Características:**

- ✅ Avatar con fallback a iniciales
- ✅ Información del usuario
- ✅ Botón de logout
- ✅ Icono de ChevronUp/Down

## 🎭 Componentes UI (shadcn/ui)

### Sidebar Components

```typescript
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar";
```

### Form Components

```typescript
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
```

### Feedback Components

```typescript
import { Badge } from "~/components/ui/badge";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { useToast } from "~/components/ui/use-toast";
```

### Navigation Components

```typescript
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
```

## 🌗 Theme Provider

**Ubicación:** `app/components/theme-provider.tsx`

**Descripción:** Provider para soporte de tema dark/light.

**Uso:**

```typescript
import { ThemeProvider } from "~/components/theme-provider";

export default function Layout() {
  return <ThemeProvider>{/* Tu app aquí */}</ThemeProvider>;
}
```

### ModeToggle

**Descripción:** Botón para cambiar entre tema claro y oscuro.

**Uso:**

```typescript
import { ModeToggle } from "~/components/mode-toggle";

<ModeToggle />;
```

## 📋 Patrones de Uso Comunes

### Layout Completo con Sidebar

```typescript
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { SiteHeader } from "~/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbItems={[{ label: "Dashboard" }]} />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

### Formulario de Datos

```typescript
import { Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";

export default function MiFormulario() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Mi Formulario</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" required />
              </div>
              <Button type="submit">Guardar</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Lista con Cards

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function MiLista({ loaderData }: Route.ComponentProps) {
  const { items } = loaderData;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item.nombre}
                <Badge>{item.estado}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.descripcion}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## 🎨 Clases CSS Útiles

### Layout

- `flex flex-1 flex-col gap-4 p-4` - Layout principal de página
- `grid gap-4 md:grid-cols-2 lg:grid-cols-3` - Grid responsive

### Texto

- `text-3xl font-bold` - Título principal
- `text-sm text-muted-foreground` - Texto secundario
- `font-medium` - Texto con énfasis

### Espaciado

- `space-y-4` - Espaciado vertical entre elementos
- `gap-4` - Gap en flex/grid
- `p-4` / `p-6` - Padding
- `mb-4` - Margin bottom

### Cards

- `rounded-xl border bg-card text-card-foreground shadow` - Card básico

## 📖 Referencias

- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
