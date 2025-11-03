import React from "react";
import type { TiposContrato } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { tiposContratoConfig } from "~/lib/mantencion/crud-config";

export default function TiposContratoComponent({
  tiposContrato,
}: {
  tiposContrato: TiposContrato[];
}) {
  return (
    <CrudLayout
      config={tiposContratoConfig}
      title={tiposContratoConfig.pluralName}
      createUrl={`/dashboard/mantencion/${tiposContratoConfig.routeBase}/crear`}
    >
      <CrudTable config={tiposContratoConfig} data={tiposContrato} />
    </CrudLayout>
  );
}
