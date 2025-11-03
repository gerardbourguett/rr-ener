import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { nichosConfig } from "~/lib/mantencion/crud-config";
import { nichoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Nicho } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Nicho - Agualova" },
    {
      name: "description",
      content: "Crear nuevo nicho en el Sistema Agualova",
    },
  ];
}

export default function CrearNicho() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(nichosConfig);

  const handleSubmit = async (data: Nicho) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={nichosConfig}
      title="Crear Nicho"
      createUrl={`/dashboard/mantencion/${nichosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${nichosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={nichosConfig}
        schema={nichoSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

