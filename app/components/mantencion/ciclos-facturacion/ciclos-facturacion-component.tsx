import React from "react";
import type { CiclosFacturacion } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { ciclosFacturacionConfig } from "~/lib/mantencion/crud-config";

export default function CiclosFacturacionComponent({
  ciclos,
}: {
  ciclos: CiclosFacturacion[];
}) {
  return (
    <CrudLayout
      config={ciclosFacturacionConfig}
      title={ciclosFacturacionConfig.pluralName}
      createUrl={`/dashboard/mantencion/${ciclosFacturacionConfig.routeBase}/crear`}
    >
      <CrudTable config={ciclosFacturacionConfig} data={ciclos} />
    </CrudLayout>
  );
}
