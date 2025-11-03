import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { ciclosFacturacionConfig } from "~/lib/mantencion/crud-config";
import { cicloFacturacionSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { CiclosFacturacion } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Ciclo de Facturación - Agualova" },
    {
      name: "description",
      content: "Crear nuevo ciclo de facturación en el Sistema Agualova",
    },
  ];
}

export default function CrearCicloFacturacion() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(ciclosFacturacionConfig);

  const handleSubmit = async (data: CiclosFacturacion) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={ciclosFacturacionConfig}
      title="Crear Ciclo de Facturación"
      createUrl={`/dashboard/mantencion/${ciclosFacturacionConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${ciclosFacturacionConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={ciclosFacturacionConfig}
        schema={cicloFacturacionSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

