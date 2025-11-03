import React from "react";
import type { Parametro } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { parametrosConfig } from "~/lib/mantencion/crud-config";

export default function ParametrosComponent({
  parametros,
}: {
  parametros: Parametro[];
}) {
  return (
    <CrudLayout
      config={parametrosConfig}
      title={parametrosConfig.pluralName}
      createUrl={`/dashboard/mantencion/${parametrosConfig.routeBase}/crear`}
    >
      <CrudTable config={parametrosConfig} data={parametros} />
    </CrudLayout>
  );
}
