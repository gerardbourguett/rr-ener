import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tiposContratoConfig } from "~/lib/mantencion/crud-config";
import { tipoContratoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { TiposContrato } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Tipo de Contrato - Agualova" },
    {
      name: "description",
      content: "Crear nuevo tipo de contrato en el Sistema Agualova",
    },
  ];
}

export default function CrearTipoContrato() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(tiposContratoConfig);

  const handleSubmit = async (data: TiposContrato) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={tiposContratoConfig}
      title="Crear Tipo de Contrato"
      createUrl={`/dashboard/mantencion/${tiposContratoConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${tiposContratoConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={tiposContratoConfig}
        schema={tipoContratoSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

