// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import { api } from "~/lib/api";
import SectoresComponent from "~/components/mantencion/sectores/sectores-component";
import type { Sectores } from "~/types/mantencion";
import type { Route } from "./+types/sectores";

export function meta() {
  return [
    { title: "Sectores - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Sectores del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const sectores = await api.get<Sectores[]>("/buscarSector");
  return { sectores };
}

export default function Sectores() {
  const { sectores } = useLoaderData<typeof clientLoader>();
  return <SectoresComponent sectores={sectores} />;
}
