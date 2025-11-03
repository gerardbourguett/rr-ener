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
 * Tipos de campos que se pueden renderizar en el formulario
 */
export type FieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "textarea"
  | "hidden";

/**
 * Configuración de un campo del formulario
 */
export interface FieldConfig<T> {
  /** Nombre del campo en el tipo T */
  name: keyof T;
  /** Etiqueta para mostrar en el formulario */
  label: string;
  /** Tipo de campo a renderizar */
  type: FieldType;
  /** Si el campo es requerido */
  required?: boolean;
  /** Placeholder para inputs */
  placeholder?: string;
  /** Opciones para select */
  options?: Array<{ value: string | number; label: string }>;
  /** Función para obtener opciones dinámicamente (para selects) */
  getOptions?: () => Promise<Array<{ value: string | number; label: string }>>;
  /** Si el campo debe estar oculto en la tabla */
  hideInTable?: boolean;
  /** Función para formatear el valor en la tabla */
  formatValue?: (value: any) => string;
  /** Si el campo es solo lectura */
  readOnly?: boolean;
  /** Orden de aparición en el formulario */
  order?: number;
}

/**
 * Configuración de endpoints de API
 */
export interface ApiEndpoints {
  /** Endpoint para listar (GET) */
  list: string;
  /** Endpoint para obtener por ID (GET) */
  get: (id: number | string) => string;
  /** Endpoint para crear (POST) */
  create: string;
  /** Endpoint para actualizar (PUT/PATCH) */
  update: (id: number | string) => string;
}

/**
 * Configuración completa de CRUD para una entidad
 */
export interface CrudConfig<T> {
  /** Nombre singular de la entidad (ej: "Parámetro") */
  singularName: string;
  /** Nombre plural de la entidad (ej: "Parámetros") */
  pluralName: string;
  /** Ruta base para la entidad (ej: "parametros") */
  routeBase: string;
  /** Configuración de campos del formulario */
  fields: FieldConfig<T>[];
  /** Endpoints de API */
  endpoints: ApiEndpoints;
  /** Campos a mostrar en la tabla (si no se especifica, usa todos los campos) */
  tableColumns?: Array<keyof T>;
  /** Función para obtener el ID de una entidad */
  getId: (entity: T) => number | string;
  /** Título de la página de lista */
  listTitle?: string;
  /** Título de la página de crear */
  createTitle?: string;
  /** Título de la página de editar */
  editTitle?: string;
}

/**
 * Configuración para Parámetros
 * GET /buscarParametro, GET /obtenerParametro/{id}, POST /crearParametro, PUT /modificarParametro
 */
export const parametrosConfig: CrudConfig<Parametro> = {
  singularName: "Parámetro",
  pluralName: "Parámetros",
  routeBase: "parametros",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "text",
      required: true,
      placeholder: "Ingrese la descripción",
      order: 1,
    },
    {
      name: "valor",
      label: "Valor",
      type: "text",
      required: true,
      placeholder: "Ingrese el valor",
      order: 2,
    },
    {
      name: "sigla",
      label: "Sigla",
      type: "text",
      required: true,
      placeholder: "Ingrese la sigla",
      order: 3,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 4,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
  ],
  endpoints: {
    list: "/buscarParametro",
    get: (id) => `/obtenerParametro/${id}`,
    create: "/crearParametro",
    update: () => `/modificarParametro`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Tarifas
 * GET /buscarTarifa, GET /obtenerTarifa/{id}, POST /crearTarifa, PUT /modificarTarifa
 */
export const tarifasConfig: CrudConfig<Tarifas> = {
  singularName: "Tarifa",
  pluralName: "Tarifas",
  routeBase: "tarifas",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "codigo",
      label: "Código",
      type: "text",
      required: true,
      placeholder: "Ingrese el código",
      order: 1,
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 2,
    },
  ],
  endpoints: {
    list: "/buscarTarifa",
    get: (id) => `/obtenerTarifa/${id}`,
    create: "/crearTarifa",
    update: () => `/modificarTarifa`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Sectores
 * GET /buscarSector, GET /obtenerSector/{id}, POST /crearSector, PUT /modificarSector/{id}
 */
export const sectoresConfig: CrudConfig<Sectores> = {
  singularName: "Sector",
  pluralName: "Sectores",
  routeBase: "sectores",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 1,
    },
    {
      name: "zona",
      label: "Zona",
      type: "text",
      required: true,
      placeholder: "Ingrese la zona",
      order: 2,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 3,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
  ],
  endpoints: {
    list: "/buscarSector",
    get: (id) => `/obtenerSector/${id}`,
    create: "/crearSector",
    update: (id) => `/modificarSector/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Zonas
 * GET /buscarZona, GET /obtenerZona/{id}, POST /crearZona, PUT /modificarZona/{id}
 */
export const zonasConfig: CrudConfig<Zonas> = {
  singularName: "Zona",
  pluralName: "Zonas",
  routeBase: "zonas",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 1,
    },
    {
      name: "referencia",
      label: "Referencia",
      type: "text",
      required: true,
      placeholder: "Ingrese la referencia",
      order: 2,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 3,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
  ],
  endpoints: {
    list: "/buscarZona",
    get: (id) => `/obtenerZona/${id}`,
    create: "/crearZona",
    update: (id) => `/modificarZona/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Nichos
 * GET /buscarNichoM, GET /obtenerNicho/{id}, POST /crearNichoM, PATCH /nichos/{id}
 */
export const nichosConfig: CrudConfig<Nicho> = {
  singularName: "Nicho",
  pluralName: "Nichos",
  routeBase: "nichos",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "codigo",
      label: "Código",
      type: "text",
      placeholder: "Código generado automáticamente",
      readOnly: true,
      order: 1,
    },
    {
      name: "sectorNombre",
      label: "Sector",
      type: "text",
      required: true,
      placeholder: "Ingrese el sector",
      order: 2,
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 3,
    },
    {
      name: "ubicacion",
      label: "Ubicación",
      type: "text",
      required: true,
      placeholder: "Ingrese la ubicación",
      order: 4,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 5,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
  ],
  endpoints: {
    list: "/buscarNichoM",
    get: (id) => `/obtenerNicho/${id}`,
    create: "/crearNichoM",
    update: (id) => `/nichos/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Marcas
 * GET /buscarMarca, GET /obtenerMarca/{codigo}, POST /crearMarcaM, PUT /modificarMarca
 */
export const marcasConfig: CrudConfig<Marca> = {
  singularName: "Marca",
  pluralName: "Marcas",
  routeBase: "marcas",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "codigo",
      label: "Código",
      type: "text",
      required: true,
      placeholder: "Ingrese el código",
      order: 1,
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 2,
    },
  ],
  endpoints: {
    list: "/buscarMarca",
    get: (codigo) => `/obtenerMarca/${codigo}`,
    create: "/crearMarcaM",
    update: (codigo) => `/modificarMarca/${codigo}`,
  },
  getId: (entity) => entity.codigo,
};

/**
 * Configuración para Empalmes
 * GET /buscarEmpalmes, GET /obtenerEmpalme/{codigo}, POST /crearEmpalmes, PUT /modificarEmpalmes
 */
export const empalmesConfig: CrudConfig<Empalme> = {
  singularName: "Empalme",
  pluralName: "Empalmes",
  routeBase: "empalmes",
  fields: [
    {
      name: "codigo",
      label: "Código",
      type: "text",
      required: true,
      placeholder: "Ingrese el código",
      order: 1,
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 2,
    },
    {
      name: "codigoCliente",
      label: "Código Cliente",
      type: "text",
      required: true,
      placeholder: "Ingrese el código del cliente",
      order: 3,
    },
    {
      name: "potenciaContratada",
      label: "Potencia Contratada",
      type: "number",
      required: true,
      placeholder: "Ingrese la potencia contratada",
      order: 4,
    },
    {
      name: "tarifa",
      label: "Tarifa",
      type: "text",
      required: true,
      placeholder: "Ingrese la tarifa",
      order: 5,
    },
  ],
  endpoints: {
    list: "/buscarEmpalmes",
    get: (codigo) => `/obtenerEmpalme/${codigo}`,
    create: "/crearEmpalmes",
    update: (codigo) => `/modificarEmpalmes/${codigo}`,
  },
  getId: (entity) => entity.codigo,
};

/**
 * Configuración para Conceptos
 * GET /buscarConceptos, GET /obtenerConcepto/{id}, POST /crearConcepto, PUT /modificarConcepto
 */
export const conceptosConfig: CrudConfig<Conceptos> = {
  singularName: "Concepto",
  pluralName: "Conceptos",
  routeBase: "conceptos",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "denominacion",
      label: "Denominación",
      type: "text",
      required: true,
      placeholder: "Ingrese la denominación",
      order: 1,
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      placeholder: "Ingrese la descripción",
      order: 2,
    },
    {
      name: "unidad",
      label: "Unidad",
      type: "text",
      required: true,
      placeholder: "Ingrese la unidad",
      order: 3,
    },
    {
      name: "fijoVariable",
      label: "Fijo/Variable",
      type: "text",
      required: true,
      placeholder: "Ingrese si es fijo o variable",
      order: 4,
    },
    {
      name: "asociadoId",
      label: "ID Asociado",
      type: "number",
      placeholder: "ID del asociado (opcional)",
      order: 5,
    },
    {
      name: "asociadoDescripcion",
      label: "Descripción Asociado",
      type: "text",
      placeholder: "Descripción del asociado (opcional)",
      readOnly: true,
      order: 6,
    },
  ],
  endpoints: {
    list: "/buscarConceptos",
    get: (id) => `/obtenerConcepto/${id}`,
    create: "/crearConcepto",
    update: (id) => `/modificarConcepto/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Claves
 * GET /buscarClaves, GET /obtenerClave/{id}, POST /crearClave, PUT /modificarClave
 */
export const clavesConfig: CrudConfig<Claves> = {
  singularName: "Clave",
  pluralName: "Claves",
  routeBase: "claves",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "text",
      required: true,
      placeholder: "Ingrese la descripción",
      order: 1,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 2,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
    {
      name: "tipo",
      label: "Tipo",
      type: "text",
      required: true,
      placeholder: "Ingrese el tipo",
      order: 3,
    },
    {
      name: "codigo",
      label: "Código",
      type: "text",
      required: true,
      placeholder: "Ingrese el código",
      order: 4,
    },
  ],
  endpoints: {
    list: "/buscarClaves",
    get: (id) => `/obtenerClave/${id}`,
    create: "/crearClave",
    update: (id) => `/modificarClave/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Ciclos de Facturación
 * GET /buscarCiclo, GET /obtenerCiclo/{id}, POST /crearCiclo, PUT /modificarCiclo
 */
export const ciclosFacturacionConfig: CrudConfig<CiclosFacturacion> = {
  singularName: "Ciclo de Facturación",
  pluralName: "Ciclos de Facturación",
  routeBase: "ciclos-facturacion",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "text",
      required: true,
      placeholder: "Ingrese la descripción",
      order: 1,
    },
    {
      name: "diaFacturacion",
      label: "Día de Facturación",
      type: "number",
      required: true,
      placeholder: "Ingrese el día de facturación",
      order: 2,
    },
    {
      name: "diaInicioLectura",
      label: "Día de Inicio de Lectura",
      type: "number",
      required: true,
      placeholder: "Ingrese el día de inicio de lectura",
      order: 3,
    },
    {
      name: "diasVencimientoFactura",
      label: "Días de Vencimiento",
      type: "number",
      required: true,
      placeholder: "Ingrese los días de vencimiento",
      order: 4,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 5,
      formatValue: (value: boolean) => (value ? "Activo" : "Inactivo"),
    },
  ],
  endpoints: {
    list: "/buscarCiclo",
    get: (id) => `/obtenerCiclo/${id}`,
    create: "/crearCiclo",
    update: (id) => `/modificarCiclo/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Configuración para Tipos de Contrato
 * GET /buscarTipoContrato, GET /obtenerTipoContrato/{id}, POST /crearTipoContrato, PUT /modificarTipoContrato
 */
export const tiposContratoConfig: CrudConfig<TiposContrato> = {
  singularName: "Tipo de Contrato",
  pluralName: "Tipos de Contrato",
  routeBase: "tipos-contrato",
  fields: [
    {
      name: "id",
      label: "ID",
      type: "hidden",
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      placeholder: "Ingrese el nombre",
      order: 1,
    },
    {
      name: "estado",
      label: "Estado",
      type: "boolean",
      order: 2,
      formatValue: (value: boolean | string) => {
        if (typeof value === "boolean") {
          return value ? "Activo" : "Inactivo";
        }
        return value;
      },
    },
  ],
  endpoints: {
    list: "/buscarTipoContrato",
    get: (id) => `/obtenerTipoContrato/${id}`,
    create: "/crearTipoContrato",
    update: (id) => `/modificarTipoContrato/${id}`,
  },
  getId: (entity) => entity.id,
};

/**
 * Mapa de todas las configuraciones CRUD
 */
export const crudConfigs = {
  parametros: parametrosConfig,
  tarifas: tarifasConfig,
  sectores: sectoresConfig,
  zonas: zonasConfig,
  nichos: nichosConfig,
  marcas: marcasConfig,
  empalmes: empalmesConfig,
  conceptos: conceptosConfig,
  claves: clavesConfig,
  "ciclos-facturacion": ciclosFacturacionConfig,
  "tipos-contrato": tiposContratoConfig,
} as const;

/**
 * Tipo helper para obtener el tipo de entidad desde una key de configuración
 */
export type CrudConfigKey = keyof typeof crudConfigs;
