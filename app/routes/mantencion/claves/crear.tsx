import React from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/crear";
import { CrudForm } from "~/components/mantencion/shared/crud-form";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { clavesConfig } from "~/lib/mantencion/crud-config";
import { claveSchema } from "~/lib/mantencion/schemas";
import { createCrudHelper } from "~/lib/mantencion/api-helpers";
import type { Claves } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Crear Clave - Agualova" },
    {
      name: "description",
      content: "Crear nueva clave en el Sistema Agualova",
    },
  ];
}

export default function CrearClave() {
  const navigate = useNavigate();
  const apiHelper = createCrudHelper(clavesConfig);

  const handleSubmit = async (data: Claves) => {
    await apiHelper.create(data);
  };

  return (
    <CrudLayout
      config={clavesConfig}
      title="Crear Clave"
      createUrl={`/dashboard/mantencion/${clavesConfig.routeBase}/crear`}
      backUrl={`/dashboard/mantencion/${clavesConfig.routeBase}`}
      showCreateButton={false}
    >
      <CrudForm
        config={clavesConfig}
        schema={claveSchema}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </CrudLayout>
  );
}

