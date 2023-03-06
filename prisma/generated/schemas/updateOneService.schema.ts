import { z } from 'zod';
import { ServiceUpdateInputObjectSchema } from './objects/ServiceUpdateInput.schema';
import { ServiceUncheckedUpdateInputObjectSchema } from './objects/ServiceUncheckedUpdateInput.schema';
import { ServiceWhereUniqueInputObjectSchema } from './objects/ServiceWhereUniqueInput.schema';

export const ServiceUpdateOneSchema = z.object({
  data: z.union([
    ServiceUpdateInputObjectSchema,
    ServiceUncheckedUpdateInputObjectSchema,
  ]),
  where: ServiceWhereUniqueInputObjectSchema,
});
