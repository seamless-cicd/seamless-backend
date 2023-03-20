import express, { Request, Response } from 'express';
import { RunStatusSchema } from '../../schemas/step-function-schema';
import runsService from '../../services/runs';
import stagesService from '../../services/stages';
import { webSocketsConnectionManager } from '../../utils/websockets';

const statusUpdatesRouter = express.Router();

statusUpdatesRouter.post('/', async (req: Request, res: Response) => {
  let data = req.body;
  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  try {
    const parsedData = RunStatusSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error('invalid status data');
    }
    const { run, stages } = parsedData.data;

    // Send data to clients through websockets
    webSocketsConnectionManager.postDataToConnections({
      type: 'status_update',
      data: parsedData.data,
    });

    // Update run
    await runsService.updateRunStatus(run.id, run.status);

    // Update stage
    await Promise.all(
      Object.values(stages).map(({ id, status }) =>
        stagesService.updateStageStatus(id, status),
      ),
    );
    res.sendStatus(200);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(400).json({ error: e.message });
    }
  }
});

export default statusUpdatesRouter;
