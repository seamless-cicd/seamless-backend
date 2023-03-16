import express, { Request, Response } from 'express';
import runsService from '../../services/runs';

const runsRouter = express.Router();

// Get all Runs for a Service
runsRouter.get('/', async (req: Request, res: Response) => {
  const { serviceId } = req.query;
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

// added to test with postman updating run status so that it can be polled from the front end
runsRouter.patch('/:runId', async (req: Request, res: Response) => {
  const { runId } = req.params;
  const data = req.body;
  const updatedData = runsService.updateOne(runId, data);
  res.status(200).json(updatedData);
});

export default runsRouter;
