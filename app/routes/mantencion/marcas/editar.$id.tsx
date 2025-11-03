import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { marcasConfig } from "~/lib/mantencion/crud-config";
import { marcaSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Marca } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Marca ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar marca ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(marcasConfig);
  const marca = await apiHelper.getById(params.id);
  return { marca };
}

export default function EditarMarca() {
  const { marca } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(marcasConfig);

  const handleSubmit = async (data: Marca) => {
    await apiHelper.update(marcasConfig.getId(marca), data);
  };

  return (
    <CrudLayout
      config={marcasConfig}
      title={`Editar Marca`}
      createUrl={`/dashboard/mantencion/${marcasConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${marcasConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={marcasConfig}
        schema={marcaSchema}
        initialData={marca}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

