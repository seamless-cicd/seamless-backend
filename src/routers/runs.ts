import express, { Request, Response } from 'express';
import runsService from '../services/runs';

const runsRouter = express.Router();

// will get all runs for a particular service
// useful for displaying all the runs that a service has
runsRouter.get('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const serviceData = await runsService.getAllForService(serviceId);
  res.status(200).json(serviceData);
});

// retrieves data for the header with run info
runsRouter.get('/header/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const runData = await runsService.getOne(runId);
  res.status(200).json(runData);
});

export default runsRouter;