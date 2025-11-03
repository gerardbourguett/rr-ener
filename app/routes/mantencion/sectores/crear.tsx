import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { sectoresConfig } from "~/lib/mantencion/crud-config";
import { sectorSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Sectores } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Sector - Agualova" },
    {
      name: "description",
      content: "Crear nuevo sector en el Sistema Agualova",
    },
  ];
}

export default function CrearSector() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(sectoresConfig);

  const handleSubmit = async (data: Sectores) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={sectoresConfig}
      title="Crear Sector"
      createUrl={`/dashboard/mantencion/${sectoresConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${sectoresConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={sectoresConfig}
        schema={sectorSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

