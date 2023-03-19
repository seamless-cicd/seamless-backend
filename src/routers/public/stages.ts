import express, { Request, Response } from 'express';
import stagesService from '../../services/stages';

const stagesRouter = express.Router();

// Get all Stages for a Run
stagesRouter.get('/', async (req: Request, res: Response) => {
  const { runId } = req.query;
  if (!runId || typeof runId !== 'string')
    return res.status(400).json({ message: 'invalid run id' });
  const serviceData = await stagesService.getAllForRun(runId);
  res.status(200).json(serviceData);
});

// Delete a Stage
stagesRouter.delete('/:stageId', async (req: Request, res: Response) => {
  const { stageId } = req.params;
  const deleteData = await stagesService.deleteOne(stageId);
  res.status(200).json(deleteData);
});

// Update a Stage
stagesRouter.patch('/:stageId', async (req: Request, res: Response) => {
  const { stageId } = req.params;
  const data = req.body;
  const updatedData = stagesService.updateOne(stageId, data);
  res.status(200).json(updatedData);
});

export default stagesRouter;
