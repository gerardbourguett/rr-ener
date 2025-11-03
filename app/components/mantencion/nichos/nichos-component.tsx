import React from "react";
import type { Nicho } from "~/types/mantencion";
import { CrudTable } from "~/components/mantencion/shared/crud-table";
import { CrudLayout } from "~/components/mantencion/shared/crud-layout";
import { nichosConfig } from "~/lib/mantencion/crud-config";

export default function NichosComponent({ nichos }: { nichos: Nicho[] }) {
  return (
    <CrudLayout
      config={nichosConfig}
      title={nichosConfig.pluralName}
      createUrl={`/dashboard/mantencion/${nichosConfig.routeBase}/crear`}
    >
      <CrudTable config={nichosConfig} data={nichos} />
    </CrudLayout>
  );
}
