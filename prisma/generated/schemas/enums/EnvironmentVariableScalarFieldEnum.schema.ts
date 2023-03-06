import { z } from 'zod';

export const EnvironmentVariableScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'resourceId',
  'resourceType',
  'name',
  'value',
]);
