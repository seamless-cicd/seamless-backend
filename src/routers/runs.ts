import express, { Request, Response } from 'express';
import runsService from '../services/runs';

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
runsRouter.post('', async (req: Request, res: Response) => {
  const { serviceId } = req.query;

  // create a new run in db
  const newRun: any = await runsService.createOne(serviceId);
  console.log(newRun.id);


  // create a new stages data in the db using the newRun id


  res.status(200).json(newRun);
});

export default runsRouter;