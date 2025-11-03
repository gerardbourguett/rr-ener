# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Enerlova**, an energy management system built with React Router v7 as a Single Page Application (SPA). The application manages billing cycles, meters, readings, contracts, and related operations for an energy company.

## Technology Stack

- **React Router v7** - Framework with file-based routing
- **React 19** - UI library
- **TypeScript** - Type safety with strict mode enabled
- **Tailwind CSS v4** - Styling with CSS variables
- **shadcn/ui** - Component library (New York style)
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **Lucide React** - Icons
- **Motion (Framer Motion)** - Animations
- **Sonner** - Toast notifications

## Development Commands

```bash
# Install dependencies (uses pnpm, npm, or bun)
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Type checking (generates React Router types + runs tsc)
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

### SPA Mode
- Configured as SPA with `ssr: false` in [react-router.config.ts](react-router.config.ts)
- All logic runs client-side using `clientLoader` and `clientAction`
- No server-side rendering

### Authentication Flow
1. JWT-based authentication stored in localStorage as `enerlova_user`
2. Login hits `/Login` endpoint, returns JWT token
3. Token is decoded to extract user ID and expiration
4. Complete user profile fetched from `/obtener/{userId}`
5. Combined User object (profile + token + exp) stored in localStorage
6. All protected routes verify auth via `clientLoader` in [app/routes/layout.tsx](app/routes/layout.tsx:18-26)

### Route Protection
The [app/routes/layout.tsx](app/routes/layout.tsx) file acts as a protective wrapper for all dashboard routes:
- Checks for valid user in localStorage
- Validates token expiration
- Redirects to `/auth/login` if unauthorized
- All nested routes automatically inherit this protection

### API Integration
- Base API client in [app/lib/api.ts](app/lib/api.ts)
- Automatically includes `Authorization: Bearer {token}` header
- Handles 401 responses by redirecting to login
- Environment-based API URL via `VITE_API_URL`

## Project Structure

```
app/
├── components/
│   ├── auth/              # Login, forgot password, reset password forms
│   ├── mantencion/        # Maintenance module components (zonas, sectores, etc.)
│   ├── sidebar/           # Sidebar navigation (app-sidebar, site-header, nav-user)
│   ├── ui/                # shadcn components
│   ├── mode-toggle.tsx    # Dark/light mode toggle
│   └── theme-provider.tsx # Theme context provider
├── hooks/
│   └── use-mobile.ts      # Mobile detection hook
├── lib/
│   ├── api.ts             # API client with auth header injection
│   └── utils.ts           # Utility functions (cn helper)
├── routes/
│   ├── auth/              # Public auth routes with special layout
│   │   ├── layout.tsx     # Auth pages layout (split panel design)
│   │   ├── login.tsx
│   │   ├── forgot-password.tsx
│   │   └── reset-password.tsx
│   ├── mantencion/        # Maintenance module routes
│   ├── layout.tsx         # Protected layout with sidebar (has clientLoader auth check)
│   ├── home.tsx           # Dashboard home (index route)
│   ├── logout.tsx         # Logout handler
│   └── not-found.tsx      # 404 page
├── services/
│   └── auth.ts            # Auth service (login, getUser, JWT decode, token validation)
├── types/                 # TypeScript type definitions
│   ├── auth.ts
│   ├── mantencion.ts
│   ├── administracion.ts
│   ├── operaciones.ts
│   ├── monitor.ts
│   ├── reportes.ts
│   └── roles-permisos.ts
├── root.tsx               # Root layout with error boundary
├── app.css                # Global styles
└── routes.ts              # Route configuration

docs/                      # Comprehensive documentation
```

## Key Files

### [app/routes.ts](app/routes.ts)
Central route configuration using React Router's type-safe routing API. All routes are defined here.

### [app/lib/api.ts](app/lib/api.ts)
Centralized API client with methods for all HTTP verbs. Automatically:
- Adds `Authorization` header
- Handles 401 errors (redirects to login)
- Manages Content-Type headers
- Configurable `requireAuth` option

### [app/services/auth.ts](app/services/auth.ts)
Complete authentication service including:
- `login()` - Login with credentials
- `getUser()` - Get user from localStorage with token validation
- `removeUser()` - Clear session (logout)
- `isAuthenticated()` - Check if user is logged in
- `getAuthHeader()` - Get Bearer token header object
- `isTokenValid()` - Check JWT expiration
- `decodeJWT()` - Decode JWT payload

### [app/components/sidebar/app-sidebar.tsx](app/components/sidebar/app-sidebar.tsx)
Main navigation sidebar with collapsible sections. Update this when adding new routes to the UI.

## Environment Variables

Create a `.env` file based on [.env.example](.env.example):

```env
# Application environment (controls UI theming)
VITE_APP_ENV=development  # or 'production'

# Backend API URL
VITE_API_URL=http://192.168.1.139:8081/Enerlova

# Node environment
NODE_ENV=development
```

**Important**: `VITE_APP_ENV` controls visual theming:
- `development` - Orange color scheme with "DEV" badge
- `production` - Blue color scheme

## Path Aliases

Configured in [tsconfig.json](tsconfig.json:18-19):
- `~/` maps to `app/`
- Example: `import { api } from "~/lib/api"`

## shadcn/ui Configuration

Configured in [components.json](components.json):
- Style: `new-york`
- Base color: `neutral`
- CSS variables enabled
- Import alias: `~/components`

## Adding New Routes

### 1. Define Route in app/routes.ts

```typescript
layout("routes/layout.tsx", [
  index("routes/home.tsx"),
  ...prefix("dashboard", [
    ...prefix("mantencion", [
      route("nueva-ruta", "routes/mantencion/nueva-ruta/nueva-ruta.tsx"),
    ]),
  ]),
]),
```

### 2. Create Route File

```typescript
// app/routes/mantencion/nueva-ruta/nueva-ruta.tsx
import type { Route } from "./+types/nueva-ruta";
import { api } from "~/lib/api";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const data = await api.get<DataType[]>("/endpoint");
  return { data };
}

export default function NuevaRuta({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return <div>{/* Your UI */}</div>;
}
```

### 3. Add to Sidebar

Update [app/components/sidebar/app-sidebar.tsx](app/components/sidebar/app-sidebar.tsx) to add the navigation link.

### 4. Create Component (Optional)

Create presentational component in `app/components/mantencion/nueva-ruta/nueva-ruta-component.tsx`.

## Common Patterns

### API Request with Error Handling

```typescript
export async function clientLoader() {
  try {
    const data = await api.get<DataType[]>("/endpoint");
    return { data };
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 });
    }
    throw error;
  }
}
```

### Form Submission

```typescript
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const result = await api.post("/endpoint", {
    field: formData.get("field"),
  });

  // Redirect on success
  throw redirect("/dashboard/mantencion/list");
}

export default function FormRoute() {
  return (
    <Form method="post">
      <input name="field" required />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

### Data Revalidation

```typescript
import { useRevalidator } from "react-router";

export default function Component() {
  const revalidator = useRevalidator();

  const handleUpdate = async () => {
    await api.patch("/endpoint", data);
    revalidator.revalidate(); // Re-runs loader
  };
}
```

## Type Generation

React Router automatically generates route types in `.react-router/types/`. Run `npm run dev` or `npm run typecheck` to generate types after adding/modifying routes.

## API Endpoints

Base URL: `VITE_API_URL` environment variable

### Authentication
- `POST /Login` - Login with credentials
- `GET /obtener/{userId}` - Get user profile

### Maintenance Module Examples
- `GET /buscarZona` - List zones
- `GET /buscarSector` - List sectors
- `GET /buscarNicho` - List niches
- `GET /buscarEmpalmes` - List meters
- `GET /buscarMarca` - List brands
- `GET /buscarCiclo` - List billing cycles
- `GET /buscarClaves` - List keys
- `GET /buscarConceptos` - List concepts
- `GET /buscarTarifa` - List tariffs
- `GET /buscarParametro` - List parameters
- `GET /buscarTipoContrato` - List contract types

API endpoints follow patterns:
- `buscar{Entity}` - List/search
- `obtener{Entity}{id}` - Get by ID
- `crear{Entity}` - Create
- `modificar{Entity}` - Update

## Module Organization

The application is organized into functional modules:

1. **Mantencion (Maintenance)** - Master data management (zones, sectors, meters, tariffs, etc.)
2. **Monitor** - Reading monitoring and import/export
3. **Operaciones** - Billing operations and price management
4. **Administración** - User and system administration
5. **Reportes** - Reporting functionality
6. **Roles y Permisos** - Role-based access control

Each module has:
- Type definitions in `app/types/{module}.ts`
- Routes in `app/routes/{module}/`
- Components in `app/components/{module}/`

## Styling Conventions

- Use Tailwind CSS utility classes
- Component styling with `cn()` utility from [app/lib/utils.ts](app/lib/utils.ts)
- Dark mode support via `next-themes` (ThemeProvider in [app/routes/layout.tsx](app/routes/layout.tsx:30))
- Responsive design with mobile-first approach
- Use shadcn/ui components for consistency

## Git Workflow

Current branch: `main` (also the default branch for PRs)

Recent commits show:
- Initial setup from React Router template
- API integration and maintenance modules added

## Important Notes

- This is a client-side only application (no SSR)
- Authentication state is managed via localStorage only
- All routes under `layout("routes/layout.tsx")` are automatically protected
- Token validation happens on every page load via `getUser()` in auth service
- Failed API requests with 401 status automatically redirect to login
- The application uses React Router v7's future flags (`v8_middleware: true`)

## Documentation

Comprehensive documentation exists in the `/docs` folder:
- [AUTH_GUIDE.md](docs/AUTH_GUIDE.md) - Authentication implementation details
- [ROUTES_STRUCTURE.md](docs/ROUTES_STRUCTURE.md) - Route configuration guide
- [API_INTEGRATION.md](docs/API_INTEGRATION.md) - API integration patterns
- [ADDING_ROUTES.md](docs/ADDING_ROUTES.md) - Step-by-step guide for new routes
- [COMPONENTS.md](docs/COMPONENTS.md) - Component documentation
- [SIMPLIFICATION.md](docs/SIMPLIFICATION.md) - Code simplification guide

Refer to these docs for detailed implementation guidance.
