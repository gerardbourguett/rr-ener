import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { conceptosConfig } from "~/lib/mantencion/crud-config";
import { conceptoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Conceptos } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Concepto ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar concepto ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(conceptosConfig);
  const concepto = await apiHelper.getById(params.id);
  return { concepto };
}

export default function EditarConcepto() {
  const { concepto } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(conceptosConfig);

  const handleSubmit = async (data: Conceptos) => {
    await apiHelper.update(conceptosConfig.getId(concepto), data);
  };

  return (
    <CrudLayout
      config={conceptosConfig}
      title={`Editar Concepto`}
      createUrl={`/dashboard/mantencion/${conceptosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${conceptosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={conceptosConfig}
        schema={conceptoSchema}
        initialData={concepto}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

