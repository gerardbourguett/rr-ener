import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { clavesConfig } from "~/lib/mantencion/crud-config";
import { claveSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Claves } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Clave ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar clave ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(clavesConfig);
  const clave = await apiHelper.getById(params.id);
  return { clave };
}

export default function EditarClave() {
  const { clave } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(clavesConfig);

  const handleSubmit = async (data: Claves) => {
    await apiHelper.update(clavesConfig.getId(clave), data);
  };

  return (
    <CrudLayout
      config={clavesConfig}
      title={`Editar Clave`}
      createUrl={`/dashboard/mantencion/${clavesConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${clavesConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={clavesConfig}
        schema={claveSchema}
        initialData={clave}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

