import React from "react";
import type { Conceptos } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { conceptosConfig } from "~/lib/mantencion/crud-config";

export default function ConceptosComponent({
  conceptos,
}: {
  conceptos: Conceptos[];
}) {
  return (
    <CrudLayout
      config={conceptosConfig}
      title={conceptosConfig.pluralName}
      createUrl={`/dashboard/mantencion/${conceptosConfig.routeBase}/crear`}
    >
      <CrudTable config={conceptosConfig} data={conceptos} />
    </CrudLayout>
  );
}
