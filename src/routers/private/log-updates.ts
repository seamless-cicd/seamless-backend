import express, { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { LogData, LogDataSchema } from '../../schemas/log-schema';
import logsService from '../../services/logs';
import { webSocketsConnectionManager } from '../../utils/websockets';

const logUpdatesRouter = express.Router();

// Websockets for log streaming
const streamLogsToClients = async (redisClient: Redis, stageId: string) => {
  // Always re-fetch all logs for the stage
  const logsData: LogData[] = await logsService.getAllForStage(
    redisClient,
    stageId,
  );
  // Send logs to clients through websockets
  await webSocketsConnectionManager.postDataToConnections({
    type: 'log',
    data: logsData,
  });
};

// Routes
const createLogUpdatesRouter = (redisClient: Redis) => {
  // Add a log
  logUpdatesRouter.post('/', async (req: Request, res: Response) => {
    try {
      if (!redisClient) {
        return res.status(500).json({ message: 'redis is unavailable' });
      }

      let logData = req.body;
      if (typeof logData === 'string') logData = JSON.parse(logData);

      const validatedLogData = LogDataSchema.safeParse(logData);

      if (!validatedLogData.success) {
        console.error('invalid log data:', logData);
        console.error(validatedLogData.error);
        return res.status(400).json({ message: 'invalid log data' });
      }

      // Store log in Redis
      await logsService.createOne(redisClient, validatedLogData.data);
      // Emit log data to frontend
      await streamLogsToClients(redisClient, validatedLogData.data.stageId);
      res.status(200).send('log stored');
    } catch (e) {
      if (e instanceof Error) {
        return res.status(500).json({ message: e.message });
      }
    }
  });

  return logUpdatesRouter;
};

export default createLogUpdatesRouter;
