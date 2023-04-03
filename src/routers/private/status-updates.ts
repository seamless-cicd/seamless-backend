import { Status } from '@prisma/client';
import express, { Request, Response } from 'express';
import { RunStatusSchema } from '../../schemas/step-function-schema';
import { mergePullRequest } from '../../services/github';
import runsService from '../../services/runs';
import servicesService from '../../services/services';
import { deploymentApprovalManager } from '../../utils/deployment-approval';
import { updateRun, updateStages } from '../../utils/status-updates-helpers';
import { webSocketsConnectionManager } from '../../utils/websockets';

const statusUpdatesRouter = express.Router();

// Receives all status updates from state machine
statusUpdatesRouter.post('/', async (req: Request, res: Response) => {
  let data = req.body;
  if (typeof data === 'string') {
    data = JSON.parse(data);
  } else {
    // Escape characters to prevent "bad control character" error
    data = JSON.parse(JSON.stringify(data));
  }

  try {
    const parsedRunStatus = RunStatusSchema.safeParse(data);
    if (!parsedRunStatus.success) {
      throw new Error('invalid status data');
    }

    await updateRun(parsedRunStatus.data);
    await updateStages(parsedRunStatus.data);

    // Send data to clients through websockets
    webSocketsConnectionManager.postDataToConnections({
      type: 'status_update',
      data: parsedRunStatus.data,
    });

    // Only auto-merge if run was successful and service enables auto-merging
    if (parsedRunStatus.data.run.status !== Status.SUCCESS) {
      return res.sendStatus(200);
    }

    if (parsedRunStatus.data.run.status !== Status.SUCCESS) {
      return res.sendStatus(200);
    }

    // Determine whether a run is associated with a PR
    const relatedRun = await runsService.getOne(parsedRunStatus.data.run.id);

    const pullNumber = relatedRun?.pullNumber;

    if (!pullNumber) {
      return res.sendStatus(200);
    }

    if (!relatedRun.serviceId) {
      throw new Error(
        'Run is not associated with a service. Could not auto-merge.',
      );
    }

    const service = await servicesService.getOne(relatedRun.serviceId);

    if (!service) {
      throw new Error('No service associated with the run.');
    }

    if (!service.autoMerge) {
      return res.sendStatus(200);
    }

    // If all the above conditions are met, auto-merge
    await mergePullRequest(pullNumber, service.githubRepoUrl);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      res.status(400).json({ error: e.message });
    }
  }
});

// Receives a "wait for approval" status update
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
