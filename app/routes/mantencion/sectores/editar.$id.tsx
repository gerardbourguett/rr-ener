import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { sectoresConfig } from "~/lib/mantencion/crud-config";
import { sectorSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Sectores } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Sector ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar sector ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(sectoresConfig);
  const sector = await apiHelper.getById(params.id);
  return { sector };
}

export default function EditarSector() {
  const { sector } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(sectoresConfig);

  const handleSubmit = async (data: Sectores) => {
    await apiHelper.update(sectoresConfig.getId(sector), data);
  };

  return (
    <CrudLayout
      config={sectoresConfig}
      title={`Editar Sector`}
      createUrl={`/dashboard/mantencion/${sectoresConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${sectoresConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={sectoresConfig}
        schema={sectorSchema}
        initialData={sector}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

