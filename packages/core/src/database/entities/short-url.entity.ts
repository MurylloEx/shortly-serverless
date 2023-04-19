import { v4 as uuid } from 'uuid';
import { Entity } from 'electrodb';
import { generate } from 'randomstring';
import { DynamoDocumentClient } from 'src/database/client';

const Options = {
  client: DynamoDocumentClient, 
  table: 'Shortly'
}

export const ShortUrl = new Entity({
  model: {
    entity: 'short_url',
    service: 'shortly',
    version: '1'
  },
  attributes: {
    shortId: {
      type: 'string',
      default: () => uuid()
    },
    shortCode: {
      type: 'string',
      default: () => generate(6)
    },
    realUrl: {
      type: 'string',
      required: true,
    },
    accessCount: {
      type: 'number',
      default: 0,
    },
    createdAt: {
      type: 'number',
      default: () => Date.now()
    },
    updatedAt: {
      type: 'number',
      readOnly: true,
      watch: '*',
      set: () => Date.now()
    },
    deletedAt: {
      type: 'number',
      default: undefined
    },
  },
  indexes: {
    primaryKey: {
      pk: {
        field: 'pk',
        composite: ['shortId']
      },
      sk: {
        field: 'sk',
        composite: ['shortCode']
      }
    }
  }
}, Options);
