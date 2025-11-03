// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Empalme } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/empalmes";
import EmpalmesComponent from "~/components/mantencion/empalmes/empalmes-component";

export function meta() {
  return [
    { title: "Empalmes - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Empalmes del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const empalmes = await api.get<Empalme[]>("/buscarEmpalmes");
  return { empalmes };
}

export default function Empalmes() {
  const { empalmes } = useLoaderData<typeof clientLoader>();
  return <EmpalmesComponent empalmes={empalmes} />;
}
