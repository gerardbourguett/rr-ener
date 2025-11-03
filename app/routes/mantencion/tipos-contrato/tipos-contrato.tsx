// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import { api } from "~/lib/api";
import type { Route } from "./+types/tipos-contrato";
import TiposContratoComponent from "~/components/mantencion/tipos-contrato/tipos-contrato-component";
import type { TiposContrato } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Tipos Contrato - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Tipos Contrato del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const tiposContrato = await api.get<TiposContrato[]>("/buscarTipoContrato");
  return { tiposContrato };
}

export default function TiposContrato() {
  const { tiposContrato } = useLoaderData<typeof clientLoader>();
  return <TiposContratoComponent tiposContrato={tiposContrato} />;
}
