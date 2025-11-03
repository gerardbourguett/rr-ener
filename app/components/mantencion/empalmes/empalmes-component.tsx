import React from "react";
import type { Empalme } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { empalmesConfig } from "~/lib/mantencion/crud-config";

export default function EmpalmesComponent({
  empalmes,
}: {
  empalmes: Empalme[];
}) {
  return (
    <CrudLayout
      config={empalmesConfig}
      title={empalmesConfig.pluralName}
      createUrl={`/dashboard/mantencion/${empalmesConfig.routeBase}/crear`}
    >
      <CrudTable config={empalmesConfig} data={empalmes} />
    </CrudLayout>
  );
}
