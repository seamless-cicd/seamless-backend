import express, { Request, Response } from 'express';
import runsService from '../../services/runs';
import stagesService from '../../services/stages';
import stepFunctionsService from '../../services/step-functions';

const runsRouter = express.Router();

// Get all Runs for a Service
runsRouter.get('/', async (req: Request, res: Response) => {
  const { serviceId } = req.query;
  if (!serviceId || typeof serviceId !== 'string')
    return res.status(400).json({ message: 'invalid service id' });
  const serviceData = await runsService.getAllForService(serviceId);
  res.status(200).json(serviceData);
});

// Get a Run
runsRouter.get('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const runData = await runsService.getOne(runId);
  res.status(200).json(runData);
});

// Create a Run and multiple placeholder Stages
runsRouter.post('/', async (req: Request, res: Response) => {
  const { serviceId } = req.query;
  if (!serviceId || typeof serviceId !== 'string')
    return res.status(400).json({ message: 'invalid service id' });

  const run = await runsService.createRunAndStages(serviceId);
  res.status(200).json(run);
});

runsRouter.delete('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const deleteData = await runsService.deleteOne(runId);
  res.status(200).json(deleteData);
});

// Start a Re-Run for this Service
runsRouter.post('/:runId/rerun', async (req: Request, res: Response) => {
  const run = req.body.data;

  try {
    // Create a new Run linked to this Service
    // Since this is a re-run, copy over the original run's git commit data
    const newRun = await runsService.createOne(run.serviceId, {
      commitHash: run.commitHash,
      commitMessage: run.commitMessage,
      committer: run.committer,
      triggerType: run.triggerType,
    });

    if (!newRun)
      return res.status(500).json({ message: 'error creating the run' });

    // Create Stages linked to this Run
    await stagesService.createAll(newRun.id);

    // Start the Step Function (state machine)
    await stepFunctionsService.start(newRun.id);

    // The returned run id will be used for navigation
    res.status(200).send(newRun.id);
  } catch (error) {
    res.status(500).json({ message: 'error starting the run' });
  }
});

// Update Run status
runsRouter.patch('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const data = req.body;
  const updatedData = runsService.updateOne(runId, data);
  res.status(200).json(updatedData);
});

export default runsRouter;
