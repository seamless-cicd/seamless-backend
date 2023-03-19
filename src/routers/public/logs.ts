import express, { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { StageIdSchema } from '../../schemas/log-schema';
import logsService from '../../services/logs';

const logsRouter = express.Router();

// Routes
const createLogsRouter = (redisClient: Redis) => {
  // Get logs for stageId
  logsRouter.get('/', async (req: Request, res: Response) => {
    try {
      if (!redisClient) {
        return res.status(500).json({ message: 'redis is unavailable' });
      }

      const { stageId } = req.query;
      const validatedStageId = StageIdSchema.safeParse(stageId);

      if (!validatedStageId.success) {
        console.error(validatedStageId.error);
        return res.status(400).json({ message: 'invalid stage id' });
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

  return logsRouter;
};

export default createLogsRouter;
