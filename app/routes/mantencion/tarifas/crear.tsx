import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tarifasConfig } from "~/lib/mantencion/crud-config";
import { tarifaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Tarifas } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Tarifa - Agualova" },
    {
      name: "description",
      content: "Crear nueva tarifa en el Sistema Agualova",
    },
  ];
}

export default function CrearTarifa() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(tarifasConfig);

  const handleSubmit = async (data: Tarifas) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={tarifasConfig}
      title="Crear Tarifa"
      createUrl={`/dashboard/mantencion/${tarifasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${tarifasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={tarifasConfig}
        schema={tarifaSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

