import { api } from "~/lib/api";
import type { CrudConfig } from "./crud-config";

/**
 * Helper para realizar operaciones CRUD genéricas
 */
export class CrudApiHelper<T> {
  private config: CrudConfig<T>;

  constructor(config: CrudConfig<T>) {
    this.config = config;
  }

  /**
   * Obtener lista de entidades
   */
  async list(): Promise<T[]> {
    return api.get<T[]>(this.config.endpoints.list);
  }

  /**
   * Obtener una entidad por ID
   */
  async getById(id: number | string): Promise<T> {
    return api.get<T>(this.config.endpoints.get(id));
  }

  /**
   * Crear una nueva entidad
   */
  async create(data: Partial<T>): Promise<T> {
    return api.post<T>(this.config.endpoints.create, data);
  }

  /**
   * Actualizar una entidad existente
   */
  async update(id: number | string, data: Partial<T>): Promise<T> {
    return api.put<T>(this.config.endpoints.update(id), data);
  }

  /**
   * Obtener el ID de una entidad
   */
  getId(entity: T): number | string {
    return this.config.getId(entity);
  }
}

/**
 * Función helper para crear un CrudApiHelper
 */
export function createCrudHelper<T>(config: CrudConfig<T>): CrudApiHelper<T> {
  return new CrudApiHelper(config);
}
