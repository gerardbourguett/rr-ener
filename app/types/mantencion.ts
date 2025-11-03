/* Ciclos de Facturación */
// GET /buscarCiclo, GET /obtenerCiclo/{id}, POST /crearCiclo, PUT /modificarCiclo
export type CiclosFacturacion = {
  id: number;
  descripcion: string;
  diaFacturacion: number;
  diaInicioLectura: number;
  diasVencimientoFactura: number;
  estado: boolean;
};

/* Claves */
// GET /buscarClaves, GET /obtenerClave/{id}, POST /crearClave, PUT /modificarClave
export type Claves = {
  id: number;
  descripcion: string;
  estado: boolean;
  tipo: string;
  codigo: string;
};

/* Conceptos */
// GET /buscarConceptos, GET /obtenerConcepto/{id}, POST /crearConcepto, PUT /modificarConceptos
export type Conceptos = {
  id: number;
  denominacion: string;
  descripcion: string;
  unidad: string;
  fijoVariable: string;
  asociadoId?: number;
  asociadoDescripcion?: string | null;
};

// GET /combo-asociado-conoceptos
export type ComboAsociadoConceptos = {
  id: number;
  descripcion: string;
};

/* Empalme */
// GET /buscarEmpalmes, GET /obtenerEmpalme/{codigo}, POST /crearEmpalmes, PUT /modificarEmpalmes
export type Empalme = {
  codigo: string;
  nombre: string;
  codigoCliente: string;
  potenciaContratada: number;
  tarifa: string;
};

/* Marca */
// GET /buscarMarca, GET /obtenerMarca/{codigo}, POST /crearMarcaM, PUT /modificarMarca
export type Marca = {
  id?: number;
  codigo: string;
  nombre: string;
};

/* Nichos */
// GET /buscarNichoM, GET /obtenerNicho/{id}, POST /crearNichoM, PATCH /nichos/{id}
export type Nicho = {
  id: number;
  codigo?: string;
  sectorNombre: string;
  nombre: string;
  ubicacion: string;
  estado: boolean;
};

export type CreateNichoRequest = {
  sectorId: number;
  nombre: string;
  ubicacion: string;
  estado: boolean;
};

export type UpdateNichoRequest = {
  sectorId: number;
  nombre: string;
  ubicacion: string;
  estado: boolean;
};

/* Parámetro */
// GET /buscarParametro, GET /obtenerParametro/{id}, POST /crearParametro, PUT /modificarParametro
export type Parametro = {
  id: number;
  descripcion: string;
  valor: string;
  sigla: string;
  estado: boolean;
};

/* Sector */
// GET /buscarSector, GET /obtenerSector/{id}, POST /crearSector, PUT /modificarSector/{id}
export type Sectores = {
  id: number;
  nombre: string;
  zona: string;
  estado: boolean;
};

/* Tipo Medidor */
// GET /buscarTarifa, GET /obtenerTarifa/{id}, POST /crearTarifa, PUT /modificarTarifa
export type Tarifas = {
  id: number;
  codigo: string;
  nombre: string;
};

/* Tipos de Contrato */
// GET /buscarTipoContrato, GET /obtenerTipoContrato/{id}, POST /crearTipoContrato, PUT /modificarTipoContrato
export type TiposContrato = {
  id: number;
  nombre: string;
  estado: boolean | string; // Puede ser boolean o string "Activo"/"Inactivo"
};

/* Zonas */
// GET /buscarZona, GET /obtenerZona/{id}, POST /crearZona, PUT /modificarZona/{id}
export type Zonas = {
  id: number;
  nombre: string;
  referencia: string;
  estado: boolean;
};
