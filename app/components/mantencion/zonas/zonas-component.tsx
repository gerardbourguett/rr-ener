import React from "react";
import type { Zonas } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { zonasConfig } from "~/lib/mantencion/crud-config";

export default function ZonasComponent({ zonas }: { zonas: Zonas[] }) {
  return (
    <CrudLayout
      config={zonasConfig}
      title={zonasConfig.pluralName}
      createUrl={`/dashboard/mantencion/${zonasConfig.routeBase}/crear`}
    >
      <CrudTable config={zonasConfig} data={zonas} />
    </CrudLayout>
  );
}
