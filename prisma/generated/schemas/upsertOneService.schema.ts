import { z } from 'zod';
import { ServiceWhereUniqueInputObjectSchema } from './objects/ServiceWhereUniqueInput.schema';
import { ServiceCreateInputObjectSchema } from './objects/ServiceCreateInput.schema';
import { ServiceUncheckedCreateInputObjectSchema } from './objects/ServiceUncheckedCreateInput.schema';
import { ServiceUpdateInputObjectSchema } from './objects/ServiceUpdateInput.schema';
import { ServiceUncheckedUpdateInputObjectSchema } from './objects/ServiceUncheckedUpdateInput.schema';

export const ServiceUpsertSchema = z.object({
  where: ServiceWhereUniqueInputObjectSchema,
  create: z.union([
    ServiceCreateInputObjectSchema,
    ServiceUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ServiceUpdateInputObjectSchema,
    ServiceUncheckedUpdateInputObjectSchema,
  ]),
});
