import express, { Request, Response } from 'express';
import runsService from '../services/runs';
import stagesService from '../services/stages';

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
runsRouter.post('', async (req: Request, res: Response) => {
  const { serviceId } = req.query;

  // create a new empty run in db
  const newRun: any = await runsService.createOne(serviceId);

  // create new empty stages data in the db using the newRun id
  await stagesService.createAll(newRun.id);

  res.status(200).json(newRun);
});

runsRouter.delete('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const deleteData = await runsService.deleteOne(runId);
  res.status(200).json(deleteData);
});

export default runsRouter;