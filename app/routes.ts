import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  // Root route - redirects to /dashboard or /auth/login based on auth status
  index("routes/index.tsx"),

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
    ...prefix("dashboard", [
      index("routes/home.tsx"), // Dashboard home at /dashboard
      ...prefix("mantencion", [
        ...prefix("zonas", [
          route("", "routes/mantencion/zonas/zonas.tsx"),
          route("crear", "routes/mantencion/zonas/crear.tsx"),
          route("editar/:id", "routes/mantencion/zonas/editar.$id.tsx"),
        ]),
        ...prefix("sectores", [
          route("", "routes/mantencion/sectores/sectores.tsx"),
          route("crear", "routes/mantencion/sectores/crear.tsx"),
          route("editar/:id", "routes/mantencion/sectores/editar.$id.tsx"),
        ]),
        ...prefix("nichos", [
          route("", "routes/mantencion/nichos/nichos.tsx"),
          route("crear", "routes/mantencion/nichos/crear.tsx"),
          route("editar/:id", "routes/mantencion/nichos/editar.$id.tsx"),
        ]),
        ...prefix("empalmes", [
          route("", "routes/mantencion/empalmes/empalmes.tsx"),
          route("crear", "routes/mantencion/empalmes/crear.tsx"),
          route(
            "editar/:codigo",
            "routes/mantencion/empalmes/editar.$codigo.tsx"
          ),
        ]),
        ...prefix("marcas", [
          route("", "routes/mantencion/marcas/marcas.tsx"),
          route("crear", "routes/mantencion/marcas/crear.tsx"),
          route("editar/:id", "routes/mantencion/marcas/editar.$id.tsx"),
        ]),
        ...prefix("ciclos-facturacion", [
          route(
            "",
            "routes/mantencion/ciclos-facturacion/ciclos-facturacion.tsx"
          ),
          route("crear", "routes/mantencion/ciclos-facturacion/crear.tsx"),
          route(
            "editar/:id",
            "routes/mantencion/ciclos-facturacion/editar.$id.tsx"
          ),
        ]),
        ...prefix("claves", [
          route("", "routes/mantencion/claves/claves.tsx"),
          route("crear", "routes/mantencion/claves/crear.tsx"),
          route("editar/:id", "routes/mantencion/claves/editar.$id.tsx"),
        ]),
        ...prefix("tipos-contrato", [
          route("", "routes/mantencion/tipos-contrato/tipos-contrato.tsx"),
          route("crear", "routes/mantencion/tipos-contrato/crear.tsx"),
          route(
            "editar/:id",
            "routes/mantencion/tipos-contrato/editar.$id.tsx"
          ),
        ]),
        ...prefix("conceptos", [
          route("", "routes/mantencion/conceptos/conceptos.tsx"),
          route("crear", "routes/mantencion/conceptos/crear.tsx"),
          route("editar/:id", "routes/mantencion/conceptos/editar.$id.tsx"),
        ]),
        ...prefix("tarifas", [
          route("", "routes/mantencion/tarifas/tarifas.tsx"),
          route("crear", "routes/mantencion/tarifas/crear.tsx"),
          route("editar/:id", "routes/mantencion/tarifas/editar.$id.tsx"),
        ]),
        ...prefix("parametros", [
          route("", "routes/mantencion/parametros/parametros.tsx"),
          route("crear", "routes/mantencion/parametros/crear.tsx"),
          route("editar/:id", "routes/mantencion/parametros/editar.$id.tsx"),
        ]),
      ]),
    ]),
  ]),

  // 404
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
