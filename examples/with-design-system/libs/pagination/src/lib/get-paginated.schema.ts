import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function getPaginatedSchema(itemSchema: SchemaObject): SchemaObject {
  const metaSchema: SchemaObject = {
    type: 'object',
    properties: {
      itemsPerPage: { type: 'integer' },
      totalItems: { type: 'integer' },
      currentPage: { type: 'integer' },
      totalPages: { type: 'integer' },
      sortBy: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              column: {
                type: 'string',
                enum: Object.keys(itemSchema.properties || ''),
              },
              order: { type: 'string', enum: ['ASC', 'DESC'] },
            },
            required: ['column', 'order'],
          },
        },
      },
      searchBy: {
        type: 'array',
        items: {
          type: 'string',
          enum: Object.keys(itemSchema.properties || ''),
        },
      },
      search: { type: 'string' },
      filter: {
        type: 'object',
        additionalProperties: {
          oneOf: [
            { type: 'string' },
            { type: 'array', items: { type: 'string' } },
            {
              type: 'object',
              additionalProperties: {
                oneOf: [
                  { type: 'string' },
                  { type: 'array', items: { type: 'string' } },
                ],
              },
            },
          ],
        },
      },
    },
    required: [
      'itemsPerPage',
      'totalItems',
      'currentPage',
      'totalPages',
      'sortBy',
    ],
  };
  const linksSchema: SchemaObject = {
    type: 'object',
    properties: {
      first: { type: 'string' },
      previous: { type: 'string' },
      current: { type: 'string' },
      next: { type: 'string' },
      last: { type: 'string' },
    },
    required: ['current'],
  };
  return {
    type: 'object',
    properties: {
      data: { type: 'array', items: itemSchema },
      meta: metaSchema,
      links: linksSchema,
    },
    required: ['data', 'meta', 'links'],
  };
}
