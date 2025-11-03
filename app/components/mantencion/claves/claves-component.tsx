import React from "react";
import type { Claves } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { clavesConfig } from "~/lib/mantencion/crud-config";

export default function ClavesComponent({ claves }: { claves: Claves[] }) {
  return (
    <CrudLayout
      config={clavesConfig}
      title={clavesConfig.pluralName}
      createUrl={`/dashboard/mantencion/${clavesConfig.routeBase}/crear`}
    >
      <CrudTable config={clavesConfig} data={claves} />
    </CrudLayout>
  );
}
