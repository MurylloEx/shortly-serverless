import {
  Schema,
  Entity,
  Item,
  PutItem,
  AllTableIndexCompositeAttributes
} from 'electrodb';

export type ElectroSchema = Schema<string, string, string>;
export type ElectroEntity<S extends ElectroSchema> = Entity<string, string, string, S>;
export type ElectroItem<S extends ElectroSchema> = Item<string, string, string, S, S['attributes']>;
export type ElectroPrimaryKey<S extends ElectroSchema> = AllTableIndexCompositeAttributes<string, string, string, S>;
export type ElectroCreateItem<S extends ElectroSchema> = PutItem<string, string, string, S>;
export type InferElectroEntitySchema<E> = E extends ElectroEntity<infer EValue> ? EValue : never;
