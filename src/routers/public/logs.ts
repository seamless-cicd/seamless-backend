import express, { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { ulid } from 'ulidx';
import { z } from 'zod';
import logsService from '../../services/logs';

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
  id: z.string(),
  log: z.string(),
  stageId: z.string(),
  timestamp: z.string().datetime(),
  score: z.number().optional(),
  type: z.string(),
});

export type LogData = z.infer<typeof LogDataSchema>;

type LogStreamingClient = {
  id: string;
  res: Response;
};

// SSE for log streaming
const logStreamingClients: LogStreamingClient[] = [];

const streamLogsToClients = async (redisClient: Redis, stageId: string) => {
  // Always re-fetch all logs for the stage
  const logsData = await logsService.getAllForStage(redisClient, stageId);
  // Send logs to all clients
  for (const client of logStreamingClients) {
    client.res.write('event: logs\n');
    client.res.write(`data: ${JSON.stringify(logsData)}\n\n`);
  }
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

  // Client initiates log streaming connection
  logsRouter.get('/stream', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');

    // Add the Response (representing a client) to our array
    logStreamingClients.push({ id: ulid(), res });

    // Remove the client when the connection is closed
    req.on('close', () => {
      const index = logStreamingClients.findIndex(
        (client) => client.res === res,
      );
      if (index > -1) {
        logStreamingClients.splice(index, 1);
      }
    });
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
