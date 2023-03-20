import express, { Request, Response } from 'express';
import { RunStatusSchema } from '../../schemas/step-function-schema';
import runsService from '../../services/runs';
import stagesService from '../../services/stages';
import deploymentApprovalManager from '../../utils/deployment-approval';
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
      res.status(400).json({ error: e.message });
    }
  }
});

statusUpdatesRouter.post(
  '/wait-for-approval',
  (req: Request, res: Response) => {
    // Add logic for waiting for task token
    const { taskToken, runId } = req.body;

    if (!taskToken) {
      return res.status(400).json({ error: 'Missing task token' });
    }

    deploymentApprovalManager.setTaskToken(runId, taskToken);

    // Post data to the frontend to wait for approval
    webSocketsConnectionManager.postDataToConnections({
      type: 'wait_for_approval',
      data: {},
    });

    return res.sendStatus(200);
  },
);

export default statusUpdatesRouter;
