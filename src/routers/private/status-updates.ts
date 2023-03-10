import express, { Request, Response } from 'express';
import { RunStatusSchema } from '../../schemas/step-functions-schema';
import runsService from '../../services/runs';
import stagesService from '../../services/stages';

const statusUpdatesRouter = express.Router();

statusUpdatesRouter.post('/', async (req: Request, res: Response) => {
  // Assumes req.body contains "runStatus"
  let data = req.body;
  if (typeof req.body === 'string') {
    data = JSON.parse(data);
  }
  const { run, stages } = RunStatusSchema.parse(data);

  try {
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
