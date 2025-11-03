import React from "react";
import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { ModeToggle } from "../mode-toggle";
import { NavUser } from "./nav-user";
import { getUser } from "~/services/auth";
import { crudConfigs } from "~/lib/mantencion/crud-config";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
}

/**
 * Mapa de rutas a nombres legibles para breadcrumbs
 */
const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  mantencion: "Mantención",
  zonas: "Zonas",
  sectores: "Sectores",
  nichos: "Nichos",
  empalmes: "Empalmes",
  marcas: "Marcas",
  "ciclos-facturacion": "Ciclos de Facturación",
  claves: "Claves",
  "tipos-contrato": "Tipos de Contrato",
  conceptos: "Conceptos",
  tarifas: "Tarifas",
  parametros: "Parámetros",
  crear: "Crear",
  editar: "Editar",
};

/**
 * Genera breadcrumbs automáticamente desde la ruta actual
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  // Remover query params y hash
  const path = pathname.split("?")[0].split("#")[0];

  // Dividir la ruta en segmentos
  const segments = path.split("/").filter(Boolean);

  // Si está en la raíz, no mostrar breadcrumbs adicionales
  if (
    segments.length === 0 ||
    (segments.length === 1 && segments[0] === "dashboard")
  ) {
    return [];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    const nextSegment =
      index + 1 < segments.length ? segments[index + 1] : null;

    // Obtener el label del segmento
    let label = routeLabels[segment] || segment;
    let href: string | undefined = currentPath;

    // Si el siguiente segmento es "crear" o "editar" y este es una entidad de mantención
    // Combinar ambos en un solo breadcrumb
    if (
      (nextSegment === "crear" || nextSegment === "editar") &&
      segment in crudConfigs
    ) {
      const config = crudConfigs[segment as keyof typeof crudConfigs];
      if (nextSegment === "crear") {
        label = `Crear ${config.singularName}`;
      } else if (nextSegment === "editar") {
        label = `Editar ${config.singularName}`;
      }
      // El href apunta a la entidad (sin crear/editar) para que sea clickeable
      href = currentPath;
      // Avanzar el path para que el siguiente segmento se salte
      currentPath += `/${nextSegment}`;
      // Si el siguiente es el último segmento (solo queda crear/editar), no mostrar href
      if (index + 1 === segments.length - 1) {
        href = undefined;
      }
    } else if (segment in crudConfigs) {
      // Si es una entidad de mantención sin crear/editar
      const config = crudConfigs[segment as keyof typeof crudConfigs];
      label = config.pluralName;
    }

    // Capitalizar si no está en el mapa y no es una entidad de mantención
    if (!routeLabels[segment] && !(segment in crudConfigs)) {
      label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    }

    // Para el último segmento, no mostrar href
    if (isLast) {
      href = undefined;
    }

    // Si este segmento es "crear" o "editar" y el anterior fue procesado, saltarlo
    if ((segment === "crear" || segment === "editar") && index > 0) {
      const prevSegment = segments[index - 1];
      if (prevSegment in crudConfigs) {
        // Ya fue procesado en la iteración anterior, saltar este
        return;
      }
    }

    breadcrumbs.push({
      label,
      href,
    });
  });

  return breadcrumbs;
}

export function SiteHeader({ breadcrumbItems }: SiteHeaderProps) {
  const user = getUser();
  const location = useLocation();

  // Generar breadcrumbs automáticamente si no se proporcionan
  const autoBreadcrumbs = React.useMemo(() => {
    if (breadcrumbItems) {
      return breadcrumbItems;
    }
    return generateBreadcrumbsFromPath(location.pathname);
  }, [location.pathname, breadcrumbItems]);

  // Detectar si es entorno UAT (puerto 3000) o Core
  const isUAT =
    typeof window !== "undefined" && window.location.port !== "8080";
  const environment = isUAT ? "Sistema UAT" : "Sistema Core";

  return (
    <header className="sticky top-0 z-10 bg-background group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 sm:group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-10 sm:h-12 shrink-0 items-center gap-1 sm:gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-2 sm:px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-0.5 sm:-ml-1 h-6 w-6 sm:h-8 sm:w-8" />
        <Separator
          orientation="vertical"
          className="mx-1 sm:mx-2 data-[orientation=vertical]:h-3 sm:data-[orientation=vertical]:h-4"
        />
        <div className="flex justify-between w-full items-center">
          <h1 className="text-sm sm:text-base font-medium">
            <Breadcrumb>
              <BreadcrumbList className="text-xs sm:text-sm">
                {autoBreadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden sm:block"></BreadcrumbItem>
                    <BreadcrumbItem
                      className={
                        index === autoBreadcrumbs.length - 1
                          ? "block"
                          : "hidden sm:block"
                      }
                    >
                      {item.href ? (
                        <BreadcrumbLink
                          href={item.href}
                          className="truncate max-w-[100px] sm:max-w-none"
                        >
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="truncate max-w-[100px] sm:max-w-none">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < autoBreadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <div>
              <Badge variant="outline" className="px-2 py-1">
                <Label className="text-xs text-primary">{environment}</Label>
              </Badge>
            </div>
            <div className="hidden sm:block">
              <ModeToggle />
            </div>
            <div>
              {user && (
                <NavUser
                  user={{
                    name: `${user.nombres} ${user.apellidos}`,
                    username: user.nombreDeUsuario,
                    avatar: "",
                    role: user.roles[0] || "Usuario",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
