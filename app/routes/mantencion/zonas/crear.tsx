import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { zonasConfig } from "~/lib/mantencion/crud-config";
import { zonaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Zonas } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Zona - Agualova" },
    {
      name: "description",
      content: "Crear nueva zona en el Sistema Agualova",
    },
  ];
}

export default function CrearZona() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(zonasConfig);

  const handleSubmit = async (data: Zonas) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={zonasConfig}
      title="Crear Zona"
      createUrl={`/dashboard/mantencion/${zonasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${zonasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={zonasConfig}
        schema={zonaSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

