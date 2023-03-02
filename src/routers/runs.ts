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

export default runsRouter;