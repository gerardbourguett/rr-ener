import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$id";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { ciclosFacturacionConfig } from "~/lib/mantencion/crud-config";
import { cicloFacturacionSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { CiclosFacturacion } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Ciclo de Facturación ${params.id} - Agualova` },
    {
      name: "description",
      content: `Editar ciclo de facturación ${params.id} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(ciclosFacturacionConfig);
  const ciclo = await apiHelper.getById(params.id);
  return { ciclo };
}

export default function EditarCicloFacturacion() {
  const { ciclo } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(ciclosFacturacionConfig);

  const handleSubmit = async (data: CiclosFacturacion) => {
    await apiHelper.update(ciclosFacturacionConfig.getId(ciclo), data);
  };

  return (
    <CrudLayout
      config={ciclosFacturacionConfig}
      title={`Editar Ciclo de Facturación`}
      createUrl={`/dashboard/mantencion/${ciclosFacturacionConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${ciclosFacturacionConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={ciclosFacturacionConfig}
        schema={cicloFacturacionSchema}
        initialData={ciclo}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

