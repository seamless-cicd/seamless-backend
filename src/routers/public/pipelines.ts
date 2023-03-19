import express, { Request, Response } from 'express';
import pipelinesService from '../../services/pipelines';

const pipelinesRouter = express.Router();

// Get all Pipelines and nested details
pipelinesRouter.get('/', async (_req: Request, res: Response) => {
  const pipelines = await pipelinesService.getAll();
  res.status(200).json(pipelines);
});

// Get a Pipeline
pipelinesRouter.get('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  const pipeline = await pipelinesService.getOne(pipelineId);
  res.status(200).json(pipeline);
});

// Create a Pipeline
pipelinesRouter.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  const createdPipeline = await pipelinesService.createOne(data);
  res.status(200).json(createdPipeline);
});

// Delete a Pipeline
pipelinesRouter.delete('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  const deletedPipeline = pipelinesService.deleteOne(pipelineId);
  res.status(200).json(deletedPipeline);
});

export default pipelinesRouter;
