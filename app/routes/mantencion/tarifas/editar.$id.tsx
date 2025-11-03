import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tarifasConfig } from "~/lib/mantencion/crud-config";
import { tarifaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Tarifas } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Tarifa ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar tarifa ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(tarifasConfig);
  const tarifa = await apiHelper.getById(params.id);
  return { tarifa };
}

export default function EditarTarifa() {
  const { tarifa } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(tarifasConfig);

  const handleSubmit = async (data: Tarifas) => {
    await apiHelper.update(tarifasConfig.getId(tarifa), data);
  };

  return (
    <CrudLayout
      config={tarifasConfig}
      title={`Editar Tarifa`}
      createUrl={`/dashboard/mantencion/${tarifasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${tarifasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={tarifasConfig}
        schema={tarifaSchema}
        initialData={tarifa}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

