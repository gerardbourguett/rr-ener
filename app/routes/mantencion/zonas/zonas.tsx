// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import ZonasComponent from "~/components/mantencion/zonas/zonas-component";
import type { Zonas } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/zonas";

export function meta() {
  return [
    { title: "Zonas - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Zonas del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const zonas = await api.get<Zonas[]>("/buscarZona");
  return { zonas };
}

export default function Zonas() {
  const { zonas } = useLoaderData<typeof clientLoader>();
  return <ZonasComponent zonas={zonas} />;
}
