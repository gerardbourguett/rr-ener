// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Marca } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/marcas";
import MarcasComponent from "~/components/mantencion/marcas/marcas-component";

export function meta() {
  return [
    { title: "Marcas - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Marcas del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const marcas = await api.get<Marca[]>("/buscarMarca");
  return { marcas };
}

export default function Marcas() {
  const { marcas } = useLoaderData<typeof clientLoader>();
  return <MarcasComponent marcas={marcas} />;
}
