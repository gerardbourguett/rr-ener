import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { parametrosConfig } from "~/lib/mantencion/crud-config";
import { parametroSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Parametro } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Parámetro ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar parámetro ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(parametrosConfig);
  const parametro = await apiHelper.getById(params.id);
  return { parametro };
}

export default function EditarParametro() {
  const { parametro } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(parametrosConfig);

  const handleSubmit = async (data: Parametro) => {
    await apiHelper.update(parametrosConfig.getId(parametro), data);
  };

  return (
    <CrudLayout
      config={parametrosConfig}
      title={`Editar Parámetro`}
      createUrl={`/dashboard/mantencion/${parametrosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${parametrosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={parametrosConfig}
        schema={parametroSchema}
        initialData={parametro}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

