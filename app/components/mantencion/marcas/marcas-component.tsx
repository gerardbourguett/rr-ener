import React from "react";
import type { Marca } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { marcasConfig } from "~/lib/mantencion/crud-config";

export default function MarcasComponent({ marcas }: { marcas: Marca[] }) {
  return (
    <CrudLayout
      config={marcasConfig}
      title={marcasConfig.pluralName}
      createUrl={`/dashboard/mantencion/${marcasConfig.routeBase}/crear`}
    >
      <CrudTable config={marcasConfig} data={marcas} />
    </CrudLayout>
  );
}
