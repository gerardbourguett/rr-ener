import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { parametrosConfig } from "~/lib/mantencion/crud-config";
import { parametroSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Parametro } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Parámetro - Agualova" },
    {
      name: "description",
      content: "Crear nuevo parámetro en el Sistema Agualova",
    },
  ];
}

export default function CrearParametro() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(parametrosConfig);

  const handleSubmit = async (data: Parametro) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={parametrosConfig}
      title="Crear Parámetro"
      createUrl={`/dashboard/mantencion/${parametrosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${parametrosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={parametrosConfig}
        schema={parametroSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

