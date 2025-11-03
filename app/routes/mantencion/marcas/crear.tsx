import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { marcasConfig } from "~/lib/mantencion/crud-config";
import { marcaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Marca } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Marca - Agualova" },
    {
      name: "description",
      content: "Crear nueva marca en el Sistema Agualova",
    },
  ];
}

export default function CrearMarca() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(marcasConfig);

  const handleSubmit = async (data: Marca) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={marcasConfig}
      title="Crear Marca"
      createUrl={`/dashboard/mantencion/${marcasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${marcasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={marcasConfig}
        schema={marcaSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

