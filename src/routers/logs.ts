import express, { Request, Response } from 'express';
import logsService from '../services/logs';
import { z } from 'zod';

const logsRouter = express.Router();

// Zod schema
const StageIdSchema = z
  .string()
  .uuid()
  .refine((uuid) => uuid.includes('-'), {
    message: 'Invalid UUID v4 format',
  });

export type StageId = z.infer<typeof StageIdSchema>;

const LogDataSchema = z.object({
  id: z.string(),
  log: z.string(),
  stageId: z.string(),
  timestamp: z.string().datetime(),
  score: z.number(),
});

export type LogData = z.infer<typeof LogDataSchema>;

// Routes
logsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { stageId } = req.query;
    const validatedStageId = StageIdSchema.safeParse(stageId);

    if (!validatedStageId.success) {
      console.error(validatedStageId.error);
      return res.status(400).json({ message: 'Invalid stageId' });
    }

    const logsData = await logsService.getAllForStage(validatedStageId.data);
    res.status(200).json(logsData);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
});

logsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const validatedLogData = LogDataSchema.safeParse(req.body);

    if (!validatedLogData.success) {
      return res.status(400).json({ message: 'Invalid log data' });
    }

    const createdLogsCount = await logsService.createOne(validatedLogData.data);
    res.status(200).json(createdLogsCount);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
});

export default logsRouter;
