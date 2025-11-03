import React from "react";
import { useFormContext } from "react-hook-form";
import type { FieldConfig } from "~/lib/mantencion/crud-config";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface FieldRendererProps<T> {
  field: FieldConfig<T>;
  isLoading?: boolean;
}

/**
 * Componente que renderiza un campo de formulario según su tipo
 */
export function FieldRenderer<T extends Record<string, any>>({
  field,
  isLoading = false,
}: FieldRendererProps<T>) {
  const form = useFormContext<T>();

  // Si el campo es hidden, no renderizamos nada visible
  if (field.type === "hidden") {
    return (
      <FormField
        control={form.control}
        name={field.name as any}
        render={({ field: formField }) => (
          <input type="hidden" {...formField} />
        )}
      />
    );
  }

  // Ordenar campos por order si está definido
  const fieldOrder = field.order ?? 999;

  return (
    <FormField
      control={form.control}
      name={field.name as any}
      render={({ field: formField }) => {
        const renderInput = () => {
          switch (field.type) {
            case "text":
              return (
                <Input
                  {...formField}
                  placeholder={field.placeholder}
                  disabled={isLoading || field.readOnly}
                  className={field.readOnly ? "bg-muted" : ""}
                />
              );

            case "number":
              return (
                <Input
                  {...formField}
                  type="number"
                  placeholder={field.placeholder}
                  disabled={isLoading || field.readOnly}
                  className={field.readOnly ? "bg-muted" : ""}
                  onChange={(e) => {
                    const value = e.target.value === "" ? undefined : Number(e.target.value);
                    formField.onChange(value);
                  }}
                  value={formField.value ?? ""}
                />
              );

            case "textarea":
              return (
                <Textarea
                  {...formField}
                  placeholder={field.placeholder}
                  disabled={isLoading || field.readOnly}
                  className={field.readOnly ? "bg-muted" : ""}
                  rows={4}
                />
              );

            case "boolean":
              return (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formField.value ?? false}
                    onCheckedChange={formField.onChange}
                    disabled={isLoading || field.readOnly}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formField.value ? "Activo" : "Inactivo"}
                  </span>
                </div>
              );

            case "select":
              if (!field.options && !field.getOptions) {
                console.warn(
                  `Field ${String(field.name)} is of type select but has no options or getOptions`
                );
                return (
                  <Input
                    {...formField}
                    placeholder={field.placeholder}
                    disabled={true}
                  />
                );
              }

              // Para selects dinámicos, necesitaríamos usar un estado o hook
              // Por ahora, solo soportamos opciones estáticas
              const options = field.options || [];

              return (
                <Select
                  onValueChange={(value) => {
                    // Intentar convertir a número si es necesario
                    const numValue = Number(value);
                    const finalValue = !isNaN(numValue) && value !== "" ? numValue : value;
                    formField.onChange(finalValue);
                  }}
                  value={formField.value ? String(formField.value) : undefined}
                  disabled={isLoading || field.readOnly}
                >
                  <FormControl>
                    <SelectTrigger className={field.readOnly ? "bg-muted" : ""}>
                      <SelectValue placeholder={field.placeholder || "Seleccione una opción"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={String(option.value)} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );

            default:
              return (
                <Input
                  {...formField}
                  placeholder={field.placeholder}
                  disabled={isLoading || field.readOnly}
                />
              );
          }
        };

        return (
          <FormItem style={{ order: fieldOrder }}>
            <FormLabel>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>{renderInput()}</FormControl>
            {field.placeholder && field.type !== "select" && (
              <FormDescription>{field.placeholder}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

