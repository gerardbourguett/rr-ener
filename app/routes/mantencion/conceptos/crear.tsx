import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { conceptosConfig } from "~/lib/mantencion/crud-config";
import { conceptoSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Conceptos } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Concepto - Agualova" },
    {
      name: "description",
      content: "Crear nuevo concepto en el Sistema Agualova",
    },
  ];
}

export default function CrearConcepto() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(conceptosConfig);

  const handleSubmit = async (data: Conceptos) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={conceptosConfig}
      title="Crear Concepto"
      createUrl={`/dashboard/mantencion/${conceptosConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${conceptosConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={conceptosConfig}
        schema={conceptoSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

