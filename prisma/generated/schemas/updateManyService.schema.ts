import { z } from 'zod';
import { ServiceUpdateManyMutationInputObjectSchema } from './objects/ServiceUpdateManyMutationInput.schema';
import { ServiceWhereInputObjectSchema } from './objects/ServiceWhereInput.schema';

export const ServiceUpdateManySchema = z.object({
  data: ServiceUpdateManyMutationInputObjectSchema,
  where: ServiceWhereInputObjectSchema.optional(),
});
