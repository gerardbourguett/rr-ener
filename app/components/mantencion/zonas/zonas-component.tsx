import React from "react";
import type { Zonas } from "../../../types/mantencion";

export default function ZonasComponent({ zonas }: { zonas: Zonas[] }) {
  return (
    <div>
      <h1>Zonas</h1>
      <pre>{JSON.stringify(zonas, null, 2)}</pre>
    </div>
  );
}
