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

  const parsedData = RunStatusSchema.parse(data);
  const { run, stages } = parsedData;

  try {
    // Send data to clients through websockets
    webSocketsConnectionManager.postDataToConnections({
      type: 'status_update',
      data: parsedData,
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
      res.json({ error: e.message }).send(400);
    }
  }
});

export default statusUpdatesRouter;
