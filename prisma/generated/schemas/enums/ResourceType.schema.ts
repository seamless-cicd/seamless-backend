import { z } from 'zod';

export const ResourceTypeSchema = z.enum([
  'PIPELINE',
  'SERVICE',
  'RUN',
  'STAGE',
  'OTHER',
]);
