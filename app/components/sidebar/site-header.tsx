import React from "react";
import { Link } from "react-router";

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

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
}

export function SiteHeader({ breadcrumbItems }: SiteHeaderProps) {
  const user = getUser();

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
                <BreadcrumbLink
                  href="/"
                  className="truncate max-w-[60px] sm:max-w-none"
                >
                  Dashboard
                </BreadcrumbLink>
                <BreadcrumbSeparator className="hidden sm:block" />
                {/* Renderiza los items del prop */}
                {breadcrumbItems?.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className="hidden sm:block"></BreadcrumbItem>
                    <BreadcrumbItem
                      className={
                        index === breadcrumbItems.length - 1
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
                    {index < (breadcrumbItems?.length || 0) - 1 && (
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
