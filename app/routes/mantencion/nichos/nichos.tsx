// oxlint-disable no-empty-pattern
import React from "react";
import { useLoaderData } from "react-router";
import type { Nicho } from "~/types/mantencion";
import { api } from "~/lib/api";
import type { Route } from "./+types/nichos";
import NichosComponent from "~/components/mantencion/nichos/nichos-component";

export function meta() {
  return [
    { title: "Nichos - Agualova" },
    {
      name: "description",
      content: "Mantenimiento de Nichos del Sistema Agualova",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const nichos = await api.get<Nicho[]>("/buscarNichoM");
  return { nichos };
}

export default function Nichos() {
  const { nichos } = useLoaderData<typeof clientLoader>();
  return <NichosComponent nichos={nichos} />;
}
