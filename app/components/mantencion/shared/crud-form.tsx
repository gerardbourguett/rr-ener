import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { FieldRenderer } from "./field-renderer";
import type { CrudConfig } from "~/lib/mantencion/crud-config";
import { Loader2, Save, X } from "lucide-react";

interface CrudFormProps<T extends Record<string, any>> {
  config: CrudConfig<T>;
  schema: z.ZodSchema<T>;
  initialData?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  onCancel?: () => void;
  isEdit?: boolean;
  title?: string;
  description?: string;
}

/**
 * Formulario genérico reutilizable para crear y editar entidades
 */
export function CrudForm<T extends Record<string, any>>({
  config,
  schema,
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
  title,
  description,
}: CrudFormProps<T>) {
  const navigate = useNavigate();
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initialData as T,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Ordenar campos por order
  const sortedFields = [...config.fields].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  // Filtrar campos ocultos de la vista (pero mantenerlos en el formulario)
  const visibleFields = sortedFields.filter((field) => field.type !== "hidden");

  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success(
        isEdit
          ? `${config.singularName} actualizado exitosamente`
          : `${config.singularName} creado exitosamente`
      );
      
      // Navegar de vuelta a la lista después de un pequeño delay para mostrar el toast
      setTimeout(() => {
        navigate(`/dashboard/mantencion/${config.routeBase}`);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : `Error al ${isEdit ? "actualizar" : "crear"} ${config.singularName.toLowerCase()}`
      );
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(`/dashboard/mantencion/${config.routeBase}`);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {title || (isEdit ? `Editar ${config.singularName}` : `Crear ${config.singularName}`)}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Renderizar campos ocultos primero */}
            {sortedFields
              .filter((field) => field.type === "hidden")
              .map((field) => (
                <FieldRenderer key={String(field.name)} field={field} />
              ))}

            {/* Renderizar campos visibles */}
            <div className="grid gap-4 md:grid-cols-2">
              {visibleFields.map((field) => (
                <FieldRenderer
                  key={String(field.name)}
                  field={field}
                  isLoading={isSubmitting}
                />
              ))}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEdit ? "Actualizar" : "Crear"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

