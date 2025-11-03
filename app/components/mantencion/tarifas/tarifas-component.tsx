import React from "react";
import type { Tarifas } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tarifasConfig } from "~/lib/mantencion/crud-config";

export default function TarifasComponent({ tarifas }: { tarifas: Tarifas[] }) {
  return (
    <CrudLayout
      config={tarifasConfig}
      title={tarifasConfig.pluralName}
      createUrl={`/dashboard/mantencion/${tarifasConfig.routeBase}/crear`}
    >
      <CrudTable config={tarifasConfig} data={tarifas} />
    </CrudLayout>
  );
}
