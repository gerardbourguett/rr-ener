// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Claves } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/claves";
import ClavesComponent from "~/components/mantencion/claves/claves-component";

export function meta() {
  return [
    { title: "Claves - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Claves del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const claves = await api.get<Claves[]>("/buscarClaves");
  return { claves };
}

export default function Claves() {
  const { claves } = useLoaderData<typeof clientLoader>();
  return <ClavesComponent claves={claves} />;
}
