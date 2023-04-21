import { AbstractRepository } from './templates';
import {
  ElectroSchema,
  ElectroEntity,
  ElectroItem,
  ElectroPrimaryKey,
  ElectroCreateItem,
  InferElectroEntitySchema
} from './types';

export class Repository<E extends ElectroEntity<S>, S extends ElectroSchema = InferElectroEntitySchema<E>> extends AbstractRepository<E, S> {

  private constructor(protected readonly entity: E) {
    super(entity);
  }

  public static from<E extends ElectroEntity<S>, S extends ElectroSchema = InferElectroEntitySchema<E>>(entity: E): Repository<E, S> {
    return new Repository(entity);
  }

  async getAll(): Promise<ElectroItem<S>[]> {
    const { data } = await this.entity.scan.go();
    return data as ElectroItem<S>[];
  }

  async getAllByPage(cursor: string, size: number): Promise<ElectroItem<S>[]> {
    const { data } = await this.entity.scan.go({
      cursor,
      limit: size
    });
    return data as ElectroItem<S>[];
  }

  async getOne(item: Partial<ElectroItem<S>>): Promise<ElectroItem<S>> {
    const { data } = await this.entity.match(item).go();

    if (!data) {
      throw new ReferenceError('The item specified was not found in database');
    }

    return (Array.isArray(data) ? data[0] : data) as ElectroItem<S>;
  }

  async create(item: ElectroCreateItem<S>): Promise<ElectroItem<S>> {
    const { data } = await this.entity.create(item).go();
    return data as ElectroItem<S>;
  }

  async update(item: Partial<ElectroItem<S>> & ElectroPrimaryKey<S>, newItem: Partial<ElectroItem<S>>): Promise<ElectroItem<S>> {
    const { data } = await this.entity.update(item).set(newItem).go({ response: 'all_new' });
    return data as ElectroItem<S>;
  }

  async remove(item: Partial<ElectroItem<S>>): Promise<ElectroItem<S>> {
    const oldItem = await this.getOne(item);
    await this.entity.delete(oldItem as ElectroPrimaryKey<S>).go();
    return oldItem;
  }

  async exists(item: Partial<ElectroItem<S>>): Promise<boolean> {
    const fetchedItem = await this.getOne(item);
    return !!fetchedItem;
  }

}
