import { z } from 'zod';

export const StatusSchema = z.enum([
  'SUCCESS',
  'FAILURE',
  'IN_PROGRESS',
  'IDLE',
]);
