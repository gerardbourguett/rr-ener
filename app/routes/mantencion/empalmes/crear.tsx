import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { empalmesConfig } from "~/lib/mantencion/crud-config";
import { empalmeSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Empalme } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Empalme - Agualova" },
    {
      name: "description",
      content: "Crear nuevo empalme en el Sistema Agualova",
    },
  ];
}

export default function CrearEmpalme() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(empalmesConfig);

  const handleSubmit = async (data: Empalme) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={empalmesConfig}
      title="Crear Empalme"
      createUrl={`/dashboard/mantencion/${empalmesConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${empalmesConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={empalmesConfig}
        schema={empalmeSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

