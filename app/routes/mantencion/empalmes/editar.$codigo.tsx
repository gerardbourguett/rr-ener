import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/editar.$codigo";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { empalmesConfig } from "~/lib/mantencion/crud-config";
import { empalmeSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Empalme } from "~/types/mantencion";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Editar Empalme ${params.codigo} - Agualova` },
    {
      name: "description",
      content: `Editar empalme ${params.codigo} en el Sistema Agualova`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const apiHelper = createCrudHelper(empalmesConfig);
  const empalme = await apiHelper.getById(params.codigo);
  return { empalme };
}

export default function EditarEmpalme() {
  const { empalme } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(empalmesConfig);

  const handleSubmit = async (data: Empalme) => {
    await apiHelper.update(empalmesConfig.getId(empalme), data);
  };

  return (
    <CrudLayout
      config={empalmesConfig}
      title={`Editar Empalme`}
      createUrl={`/dashboard/mantencion/${empalmesConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${empalmesConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={empalmesConfig}
        schema={empalmeSchema}
        initialData={empalme}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </CrudLayout>
  );
}

