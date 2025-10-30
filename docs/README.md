# Documentación - Sistema Enerlova

Bienvenido a la documentación del sistema Enerlova construido con React Router v7.

## 📚 Índice de Documentación

### Autenticación

- **[AUTH_GUIDE.md](./AUTH_GUIDE.md)** - Guía completa de autenticación con JWT
- **[SIMPLIFICATION.md](./SIMPLIFICATION.md)** - Cómo simplificamos el código usando React Router v7

### Estructura del Proyecto

- **[ROUTES_STRUCTURE.md](./ROUTES_STRUCTURE.md)** - Estructura y configuración de rutas
- **[COMPONENTS.md](./COMPONENTS.md)** - Documentación de componentes principales

### Guías de Desarrollo

- **[ADDING_ROUTES.md](./ADDING_ROUTES.md)** - Cómo agregar nuevas rutas protegidas
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Integración con la API backend

## 🚀 Inicio Rápido

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://192.168.1.139:8082
NODE_ENV=development
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Ejecutar en Desarrollo

```bash
pnpm dev
```

### 4. Login

Visita `http://localhost:5173` y serás redirigido a `/auth/login`.

## 🔑 Credenciales de Prueba

```
Usuario: gbourguett@lovalledor.cl
Contraseña: TqgvHGYAE3RR*fTq8$NM
```

## 📊 Stack Tecnológico

- **React Router v7** - Framework y routing
- **React 19** - UI Library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI Components
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🏗️ Arquitectura

### Modo SPA

Este proyecto funciona como **Single Page Application (SPA)** con:

- Client-side rendering (`ssr: false`)
- localStorage para sesión de usuario
- clientLoader/clientAction para lógica del cliente

### Autenticación

- JWT tokens del backend
- Perfil de usuario completo desde `/obtener/{id}`
- Token + datos de usuario en localStorage
- Validación en cada ruta protegida

## 📁 Estructura de Carpetas

```
app/
├── components/          # Componentes reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── sidebar/        # Sidebar y navegación
│   └── ui/             # Componentes UI (shadcn)
├── routes/             # Rutas de la aplicación
│   ├── auth/          # Rutas de autenticación
│   ├── layout.tsx     # Layout principal con sidebar
│   └── home.tsx       # Dashboard home
├── services/          # Servicios y lógica de negocio
│   └── auth.ts        # Servicio de autenticación
├── types/             # Definiciones de TypeScript
│   └── auth.ts        # Tipos de autenticación
└── lib/               # Utilidades
    └── utils.ts       # Helpers generales
```

## 🔗 Enlaces Útiles

- [React Router v7 Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)

## 🐛 Solución de Problemas

### Error: "No route matches URL"

Verifica que la ruta esté definida en `app/routes.ts`

### Error: "Cannot find module '+types/...'"

Ejecuta `pnpm dev` para generar los tipos automáticamente

### Usuario no puede acceder después del login

- Verifica que el token esté en localStorage: `localStorage.getItem('enerlova_user')`
- Verifica que el token no haya expirado
- Limpia localStorage y vuelve a iniciar sesión

## 📞 Soporte

Para problemas o preguntas, contacta al equipo de desarrollo.
