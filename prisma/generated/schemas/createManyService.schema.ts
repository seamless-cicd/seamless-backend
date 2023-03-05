import { z } from 'zod';
import { ServiceCreateManyInputObjectSchema } from './objects/ServiceCreateManyInput.schema';

export const ServiceCreateManySchema = z.object({
  data: z.union([
    ServiceCreateManyInputObjectSchema,
    z.array(ServiceCreateManyInputObjectSchema),
  ]),
});
