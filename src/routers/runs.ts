import express, { Request, Response } from 'express';
import runsService from '../services/runs';
import stagesService from '../services/stages';
import stepFunctionsService from '../services/step-functions';

const runsRouter = express.Router();

runsRouter.get('', async (req: Request, res: Response) => {
  const { serviceId } = req.query;
  const serviceData = await runsService.getAllForService(serviceId);
  res.status(200).json(serviceData);
});

runsRouter.get('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const runData = await runsService.getOne(runId);
  res.status(200).json(runData);
});

// post to runs router when run button is clicked on a service
// this will create an empty run and corresponding empty stages for use since
// a run has stages
runsRouter.post('/', async (req: Request, res: Response) => {
  const { serviceId } = req.query;

  // create a new empty run in db
  const newRun = await runsService.createOne(serviceId);

  if (!newRun)
    return res
      .status(500)
      .json({ message: 'There was a problem creating the run' });

  // create new empty stages data in the db using the newRun id
  await stagesService.createAll(newRun.id);

  res.status(200).json(newRun);
});

// Start a Step Function for this Run
// Run and Stages must first be created by POSTing to /runs
runsRouter.post('/:runId/start', async (req: Request, res: Response) => {
  const { runId } = req.params;
  try {
    await stepFunctionsService.start(runId);
    res.status(200).json({ message: 'Step function started' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem executing the Step Function' });
  }
});

runsRouter.delete('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const deleteData = await runsService.deleteOne(runId);
  res.status(200).json(deleteData);
});

export default runsRouter;
