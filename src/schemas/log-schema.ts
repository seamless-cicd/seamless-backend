import { z } from 'zod';

export const StageIdSchema = z
  .string()
  .uuid()
  .refine((uuid) => uuid.includes('-'), {
    message: 'Invalid UUID v4 format',
  });

export type StageId = z.infer<typeof StageIdSchema>;

export const LogDataSchema = z.object({
  id: z.string(), // ULID
  message: z.string(), // Log text
  timestamp: z.string().datetime(), // From ULID
  score: z.number().optional(), // Numerical value of ULID
  type: z.string(), // stdout or stderr
  stageId: z.string().uuid(), // Pipeline stage UUID
});

export type LogData = z.infer<typeof LogDataSchema>;
