// oxlint-disable no-empty-pattern
import React from "react";
import type { Route } from "./+types/zonas";
import { useLoaderData } from "react-router";
import ZonasComponent from "~/components/mantencion/zonas/zonas-component";
import type { Zonas } from "~/types/mantencion";
import { api } from "~/lib/api";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const zonas = await api.get<Zonas[]>("/buscarZona");
  console.log("zonas", zonas);
  return { zonas };
}

export default function Zonas() {
  const { zonas } = useLoaderData<typeof clientLoader>();
  return <ZonasComponent zonas={zonas} />;
}
