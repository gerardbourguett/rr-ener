import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

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
      // route("usuarios", "routes/dashboard/usuarios.tsx"),
      // route("contratos", "routes/dashboard/contratos.tsx"),
    ]),

    ...prefix("mantencion", [route("zonas", "routes/mantencion/zonas.tsx")]),
  ]),

  // 404
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
