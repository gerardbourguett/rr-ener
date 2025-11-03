// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { CiclosFacturacion } from "~/types/mantencion";
import { api } from "~/lib/api";
import CiclosFacturacionComponent from "~/components/mantencion/ciclos-facturacion/ciclos-facturacion-component";
import type { Route } from "./+types/ciclos-facturacion";

export function meta() {
  return [
    { title: "Ciclos Facturación - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Ciclos Facturación del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const ciclos = await api.get<CiclosFacturacion[]>("/buscarCiclo");
  return { ciclos };
}

export default function CiclosFacturacion() {
  const { ciclos } = useLoaderData<typeof clientLoader>();
  return <CiclosFacturacionComponent ciclos={ciclos} />;
}
