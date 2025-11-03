import React from "react";
import { Link } from "react-router";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { CrudConfig } from "~/lib/mantencion/crud-config";

interface CrudLayoutProps {
  config: CrudConfig<any>;
  title: string;
  createUrl: string;
  backUrl?: string;
  children: React.ReactNode;
  showCreateButton?: boolean;
}

/**
 * Layout común para páginas CRUD con header, breadcrumbs y botones de acción
 */
export function CrudLayout({
  config,
  title,
  createUrl,
  backUrl,
  children,
  showCreateButton = true,
}: CrudLayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backUrl && (
            <Button variant="ghost" size="icon" asChild>
              <Link to={backUrl}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestión de {config.pluralName.toLowerCase()}
            </p>
          </div>
        </div>
        {showCreateButton && (
          <Button asChild>
            <Link to={createUrl}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">
                Crear {config.singularName}
              </span>
              <span className="sm:hidden">Crear</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
