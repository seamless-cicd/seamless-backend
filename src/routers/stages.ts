import express, { Request, Response } from 'express';
import stagesService from '../services/stages';

const stagesRouter = express.Router();

// will get all runs for a particular service
stagesRouter.get('', async (req: Request, res: Response) => {
  const { runId } = req.query;
  const serviceData = await stagesService.getAllForRun(runId);
  res.status(200).json(serviceData);
});

export default stagesRouter;