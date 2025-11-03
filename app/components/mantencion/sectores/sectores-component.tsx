import React from "react";
import type { Sectores } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { sectoresConfig } from "~/lib/mantencion/crud-config";

export default function SectoresComponent({
  sectores,
}: {
  sectores: Sectores[];
}) {
  return (
    <CrudLayout
      config={sectoresConfig}
      title={sectoresConfig.pluralName}
      createUrl={`/dashboard/mantencion/${sectoresConfig.routeBase}/crear`}
    >
      <CrudTable config={sectoresConfig} data={sectores} />
    </CrudLayout>
  );
}
