// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Parametro } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/parametros";
import ParametrosComponent from "~/components/mantencion/parametros/parametros-component";

export function meta() {
  return [
    { title: "Parámetros - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Parámetros del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const parametros = await api.get<Parametro[]>("/buscarParametro");
  return { parametros };
}

export default function Parametros() {
  const { parametros } = useLoaderData<typeof clientLoader>();
  return <ParametrosComponent parametros={parametros} />;
}
