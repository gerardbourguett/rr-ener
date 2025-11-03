import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { nichosConfig } from "~/lib/mantencion/crud-config";
import { nichoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Nicho } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Nicho ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar nicho ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(nichosConfig);
  const nicho = await apiHelper.getById(params.id);
  return { nicho };
}

export default function EditarNicho() {
  const { nicho } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(nichosConfig);

  const handleSubmit = async (data: Nicho) => {
    await apiHelper.update(nichosConfig.getId(nicho), data);
  };

  return (
    <CrudLayout
      config={nichosConfig}
      title={`Editar Nicho`}
      createUrl={`/dashboard/mantencion/${nichosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${nichosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={nichosConfig}
        schema={nichoSchema}
        initialData={nicho}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

