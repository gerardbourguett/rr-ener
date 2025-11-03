import React from "react";
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  redirect,
} from "react-router";

import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { SiteHeader } from "~/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { ThemeProvider } from "~/components/theme-provider";
import { getUser } from "~/services/auth";
import { Button } from "~/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

// clientLoader para proteger el dashboard
export async function clientLoader() {
  const user = getUser();

  if (!user) {
    throw redirect("/auth/login");
  }

  return { user };
}

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="enerlova-theme">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};

// ErrorBoundary nativo de React Router
export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage = "Ha ocurrido un error inesperado";
  let errorDetails = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `Error ${error.status}`;
    errorDetails = error.statusText || error.data?.message || "";
  } else if (error instanceof Error) {
    errorDetails = error.message;
  }

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-lg border">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{errorMessage}</h1>
            {errorDetails && (
              <p className="text-sm text-muted-foreground">{errorDetails}</p>
            )}
          </div>

          <div className="pt-4 space-y-2">
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            Si el problema persiste, contacta al administrador del sistema
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
