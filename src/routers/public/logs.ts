import express, { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { z } from 'zod';
import logsService from '../../services/logs';
import { webSocketsConnectionManager } from '../../utils/websockets';

const logsRouter = express.Router();

// Types and Zod
const StageIdSchema = z
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

// Websockets for log streaming
const streamLogsToClients = async (redisClient: Redis, stageId: string) => {
  // Always re-fetch all logs for the stage
  const logsData = await logsService.getAllForStage(redisClient, stageId);
  // Send logs to all clients
  // Send data to clients through websockets
  await webSocketsConnectionManager.postDataToConnections({
    type: 'log',
    data: logsData,
  });
};

// Routes
const createLogsRouter = (redisClient: Redis) => {
  // Get logs for stageId
  logsRouter.get('/', async (req: Request, res: Response) => {
    try {
      if (!redisClient) {
        return res.status(500).json({ message: 'Redis is unavailable' });
      }

      const { stageId } = req.query;
      const validatedStageId = StageIdSchema.safeParse(stageId);

      if (!validatedStageId.success) {
        console.error(validatedStageId.error);
        return res.status(400).json({ message: 'Invalid stageId' });
      }

      const logsData = await logsService.getAllForStage(
        redisClient,
        validatedStageId.data,
      );
      res.status(200).json(logsData);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message });
      }
    }
  });

  // Add a log
  logsRouter.post('/', async (req: Request, res: Response) => {
    try {
      if (!redisClient) {
        return res.status(500).json({ message: 'Redis is unavailable' });
      }

      let logData = req.body;
      if (typeof logData === 'string') logData = JSON.parse(logData);

      const validatedLogData = LogDataSchema.safeParse(logData);

      if (!validatedLogData.success) {
        console.error('Invalid log data:', logData);
        console.error(validatedLogData.error);
        return res.status(400).json({ message: 'Invalid log data' });
      }

      // Store log in Redis
      await logsService.createOne(redisClient, validatedLogData.data);
      // Emit log data to frontend
      await streamLogsToClients(redisClient, validatedLogData.data.stageId);
      res.status(200).send('Log stored');
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message });
      }
    }
  });

  return logsRouter;
};

export default createLogsRouter;
