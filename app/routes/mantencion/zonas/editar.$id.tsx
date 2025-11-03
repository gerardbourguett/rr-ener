import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { zonasConfig } from "~/lib/mantencion/crud-config";
import { zonaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Zonas } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Zona ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar zona ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(zonasConfig);
  const zona = await apiHelper.getById(params.id);
  return { zona };
}

export default function EditarZona() {
  const { zona } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(zonasConfig);

  const handleSubmit = async (data: Zonas) => {
    await apiHelper.update(zonasConfig.getId(zona), data);
  };

  return (
    <CrudLayout
      config={zonasConfig}
      title={`Editar Zona`}
      createUrl={`/dashboard/mantencion/${zonasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${zonasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={zonasConfig}
        schema={zonaSchema}
        initialData={zona}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

