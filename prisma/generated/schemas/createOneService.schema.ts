import { z } from 'zod';
import { ServiceCreateInputObjectSchema } from './objects/ServiceCreateInput.schema';
import { ServiceUncheckedCreateInputObjectSchema } from './objects/ServiceUncheckedCreateInput.schema';

export const ServiceCreateOneSchema = z.object({
  data: z.union([
    ServiceCreateInputObjectSchema,
    ServiceUncheckedCreateInputObjectSchema,
  ]),
});
