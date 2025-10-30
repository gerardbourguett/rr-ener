import { redirect } from "react-router";
import type { Route } from "./+types/home";
import { getUser } from "~/services/auth";

export function meta() {
  return [
    { title: "Dashboard - Enerlova" },
    { name: "description", content: "Dashboard del Sistema Enerlova" },
  ];
}

export async function clientLoader() {
  const user = getUser();

  if (!user) {
    throw redirect("/auth/login");
  }

  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenido, {user?.nombres} {user?.apellidos}!
          </h1>
          <p className="text-muted-foreground">
            {user?.roles && user.roles.length > 0
              ? user.roles.join(", ")
              : "Sin rol asignado"}
          </p>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Información Personal */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Información Personal</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Nombre de Usuario:
                </span>
                <span className="font-medium">{user?.nombreDeUsuario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID Usuario:</span>
                <span className="font-medium">{user?.idUsuario}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información Administrativa */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">
              Información Administrativa
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Perfil ID:</span>
                <span className="font-medium">{user?.perfilId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Departamento:</span>
                <span className="font-medium">{user?.departamento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    user?.activo
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {user?.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Cuenta */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">
              Información de Cuenta
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Fecha de Creación:
                </span>
                <span className="font-medium">
                  {user?.fechaCreacion
                    ? new Date(user.fechaCreacion).toLocaleDateString("es-CL")
                    : "N/A"}
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <span className="text-muted-foreground">Roles:</span>
                {user?.roles && user.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm">Sin roles asignados</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats o Placeholder */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Panel de Control</h3>
          <p className="text-muted-foreground text-sm">
            Bienvenido al sistema Enerlova. Utiliza el menú lateral para navegar
            entre las diferentes secciones del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
