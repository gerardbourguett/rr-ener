import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tiposContratoConfig } from "~/lib/mantencion/crud-config";
import { tipoContratoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { TiposContrato } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Tipo de Contrato ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar tipo de contrato ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(tiposContratoConfig);
  const tipoContrato = await apiHelper.getById(params.id);
  return { tipoContrato };
}

export default function EditarTipoContrato() {
  const { tipoContrato } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(tiposContratoConfig);

  const handleSubmit = async (data: TiposContrato) => {
    await apiHelper.update(tiposContratoConfig.getId(tipoContrato), data);
  };

  return (
    <CrudLayout
      config={tiposContratoConfig}
      title={`Editar Tipo de Contrato`}
      createUrl={`/dashboard/mantencion/${tiposContratoConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${tiposContratoConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={tiposContratoConfig}
        schema={tipoContratoSchema}
        initialData={tipoContrato}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

