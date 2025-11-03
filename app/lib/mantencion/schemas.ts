import { z } from "zod";
import type {
  Parametro,
  Tarifas,
  Sectores,
  Zonas,
  Nicho,
  Marca,
  Empalme,
  Conceptos,
  Claves,
  CiclosFacturacion,
  TiposContrato,
} from "~/types/mantencion";

/**
 * Esquema para Parámetros
 */
export const parametroSchema = z.object({
  id: z.number().optional(),
  descripcion: z.string().min(1, "La descripción es requerida"),
  valor: z.string().min(1, "El valor es requerido"),
  sigla: z.string().min(1, "La sigla es requerida"),
  estado: z.boolean().default(true),
});

export type ParametroFormData = z.infer<typeof parametroSchema>;

/**
 * Esquema para Tarifas
 */
export const tarifaSchema = z.object({
  id: z.number().optional(),
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
});

export type TarifaFormData = z.infer<typeof tarifaSchema>;

/**
 * Esquema para Sectores
 */
export const sectorSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  zona: z.string().min(1, "La zona es requerida"),
  estado: z.boolean().default(true),
});

export type SectorFormData = z.infer<typeof sectorSchema>;

/**
 * Esquema para Zonas
 */
export const zonaSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  referencia: z.string().min(1, "La referencia es requerida"),
  estado: z.boolean().default(true),
});

export type ZonaFormData = z.infer<typeof zonaSchema>;

/**
 * Esquema para Nichos
 */
export const nichoSchema = z.object({
  id: z.number().optional(),
  codigo: z.string().optional(),
  sectorNombre: z.string().min(1, "El sector es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  estado: z.boolean().default(true),
});

export type NichoFormData = z.infer<typeof nichoSchema>;

/**
 * Esquema para Marcas
 */
export const marcaSchema = z.object({
  id: z.number().optional(),
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
});

export type MarcaFormData = z.infer<typeof marcaSchema>;

/**
 * Esquema para Empalmes
 */
export const empalmeSchema = z.object({
  codigo: z.string().min(1, "El código es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  codigoCliente: z.string().min(1, "El código del cliente es requerido"),
  potenciaContratada: z
    .number()
    .min(0, "La potencia contratada debe ser mayor o igual a 0"),
  tarifa: z.string().min(1, "La tarifa es requerida"),
});

export type EmpalmeFormData = z.infer<typeof empalmeSchema>;

/**
 * Esquema para Conceptos
 */
export const conceptoSchema = z.object({
  id: z.number().optional(),
  denominacion: z.string().min(1, "La denominación es requerida"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  unidad: z.string().min(1, "La unidad es requerida"),
  fijoVariable: z.string().min(1, "El campo fijo/variable es requerido"),
  asociadoId: z.number().optional(),
  asociadoDescripcion: z.string().nullable().optional(),
});

export type ConceptoFormData = z.infer<typeof conceptoSchema>;

/**
 * Esquema para Claves
 */
export const claveSchema = z.object({
  id: z.number().optional(),
  descripcion: z.string().min(1, "La descripción es requerida"),
  estado: z.boolean().default(true),
  tipo: z.string().min(1, "El tipo es requerido"),
  codigo: z.string().min(1, "El código es requerido"),
});

export type ClaveFormData = z.infer<typeof claveSchema>;

/**
 * Esquema para Ciclos de Facturación
 */
export const cicloFacturacionSchema = z.object({
  id: z.number().optional(),
  descripcion: z.string().min(1, "La descripción es requerida"),
  diaFacturacion: z
    .number()
    .int()
    .min(1)
    .max(31, "El día de facturación debe estar entre 1 y 31"),
  diaInicioLectura: z
    .number()
    .int()
    .min(1)
    .max(31, "El día de inicio de lectura debe estar entre 1 y 31"),
  diasVencimientoFactura: z
    .number()
    .int()
    .min(1, "Los días de vencimiento deben ser mayor a 0"),
  estado: z.boolean().default(true),
});

export type CicloFacturacionFormData = z.infer<typeof cicloFacturacionSchema>;

/**
 * Esquema para Tipos de Contrato
 */
export const tipoContratoSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es requerido"),
  estado: z.union([z.boolean(), z.string()]).default(true),
});

export type TipoContratoFormData = z.infer<typeof tipoContratoSchema>;

/**
 * Mapa de esquemas para cada entidad
 */
export const schemas = {
  parametros: parametroSchema,
  tarifas: tarifaSchema,
  sectores: sectorSchema,
  zonas: zonaSchema,
  nichos: nichoSchema,
  marcas: marcaSchema,
  empalmes: empalmeSchema,
  conceptos: conceptoSchema,
  claves: claveSchema,
  "ciclos-facturacion": cicloFacturacionSchema,
  "tipos-contrato": tipoContratoSchema,
} as const;

/**
 * Tipo helper para obtener el tipo de datos de formulario desde una key
 */
export type SchemaKey = keyof typeof schemas;
