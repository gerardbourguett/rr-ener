// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import { api } from "~/lib/api";
import type { Route } from "./+types/tarifas";
import TarifasComponent from "~/components/mantencion/tarifas/tarifas-component";
import type { Tarifas } from "~/types/mantencion";

export function meta() {
  return [
    { title: "Tarifas - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Tarifas del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const tarifas = await api.get<Tarifas[]>("/buscarTarifa");
  return { tarifas };
}

export default function Tarifas() {
  const { tarifas } = useLoaderData<typeof clientLoader>();
  return <TarifasComponent tarifas={tarifas} />;
}
