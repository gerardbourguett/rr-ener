import React from "react";
import { Link } from "react-router";
import { Pencil, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { CrudConfig } from "~/lib/mantencion/crud-config";

interface CrudTableProps<T extends Record<string, any>> {
  config: CrudConfig<T>;
  data: T[];
  isLoading?: boolean;
  editUrl?: (id: number | string) => string;
}

/**
 * Tabla genérica para listar entidades con acciones de editar
 */
export function CrudTable<T extends Record<string, any>>({
  config,
  data,
  isLoading = false,
  editUrl,
}: CrudTableProps<T>) {
  // Obtener campos visibles para la tabla
  const visibleFields = config.fields.filter(
    (field) => !field.hideInTable && field.type !== "hidden"
  );

  // Si hay tableColumns definidas, usar esas, sino usar los campos visibles
  const columnsToShow = config.tableColumns
    ? config.tableColumns
    : visibleFields.map((field) => field.name);

  // Obtener configuración de cada columna
  const getColumnConfig = (fieldName: keyof T) => {
    return config.fields.find((f) => f.name === fieldName);
  };

  // Formatear valor de celda
  const formatCellValue = (
    value: any,
    fieldConfig?: ReturnType<typeof getColumnConfig>
  ) => {
    if (value === null || value === undefined) {
      return "-";
    }

    // Si hay una función de formato personalizada, usarla
    if (fieldConfig?.formatValue) {
      return fieldConfig.formatValue(value);
    }

    // Formatear booleanos
    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "outline"}>
          {value ? "Activo" : "Inactivo"}
        </Badge>
      );
    }

    // Formatear números
    if (typeof value === "number") {
      return value.toLocaleString();
    }

    // Por defecto, convertir a string
    return String(value);
  };

  // Generar URL de edición
  const getEditUrl = (entity: T) => {
    if (editUrl) {
      return editUrl(config.getId(entity));
    }
    return `/dashboard/mantencion/${config.routeBase}/editar/${config.getId(entity)}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">Cargando...</div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{config.pluralName}</CardTitle>
          <CardDescription>
            No hay {config.pluralName.toLowerCase()} registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No se encontraron {config.pluralName.toLowerCase()}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.pluralName}</CardTitle>
        <CardDescription>
          Lista de {config.pluralName.toLowerCase()} ({data.length}{" "}
          {data.length === 1 ? "registro" : "registros"})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columnsToShow.map((columnName) => {
                const fieldConfig = getColumnConfig(columnName);
                return (
                  <TableHead key={String(columnName)}>
                    {fieldConfig?.label || String(columnName)}
                  </TableHead>
                );
              })}
              <TableHead className="w-[100px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entity, index) => {
              const entityId = config.getId(entity);
              return (
                <TableRow key={String(entityId) || index}>
                  {columnsToShow.map((columnName) => {
                    const fieldConfig = getColumnConfig(columnName);
                    const value = entity[columnName];
                    return (
                      <TableCell key={String(columnName)}>
                        {formatCellValue(value, fieldConfig)}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={getEditUrl(entity)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">
                          Editar {config.singularName}
                        </span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
