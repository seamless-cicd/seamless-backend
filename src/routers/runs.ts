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

export default runsRouter;