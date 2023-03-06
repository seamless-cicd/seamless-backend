import { z } from 'zod';
import { ServiceWhereInputObjectSchema } from './objects/ServiceWhereInput.schema';

export const ServiceDeleteManySchema = z.object({
  where: ServiceWhereInputObjectSchema.optional(),
});
