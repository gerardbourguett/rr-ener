// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Conceptos } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/conceptos";
import ConceptosComponent from "~/components/mantencion/conceptos/conceptos-component";

export function meta() {
  return [
    { title: "Conceptos - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Conceptos del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const conceptos = await api.get<Conceptos[]>("/buscarConceptos");
  return { conceptos };
}

export default function Conceptos() {
  const { conceptos } = useLoaderData<typeof clientLoader>();
  return <ConceptosComponent conceptos={conceptos} />;
}
