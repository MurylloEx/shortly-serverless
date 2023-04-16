import {
  ElectroEntity,
  ElectroItem,
  ElectroSchema,
  ElectroPrimaryKey,
  ElectroCreateItem,
  InferElectroEntitySchema
} from 'src/repositories/types';

export abstract class AbstractRepository<E extends ElectroEntity<S>, S extends ElectroSchema = InferElectroEntitySchema<E>> {
  constructor(protected readonly entity: E) {}

  abstract getAll(): Promise<ElectroItem<S>[]>;
  abstract getAllByPage(cursor: string, size: number): Promise<ElectroItem<S>[]>;
  abstract getOne(item: Partial<ElectroItem<S>>): Promise<ElectroItem<S>>;
  abstract create(item: ElectroCreateItem<S>): Promise<ElectroItem<S>>;
  abstract update(item: Partial<ElectroItem<S>> & ElectroPrimaryKey<S>, newItem: Partial<ElectroItem<S>>): Promise<ElectroItem<S>>;
  abstract remove(item: Partial<ElectroItem<S>>): Promise<ElectroItem<S>>;
  abstract exists(item: Partial<ElectroItem<S>>): Promise<boolean>;
}
