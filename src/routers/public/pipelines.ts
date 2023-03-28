import express, { Request, Response } from 'express';
import pipelinesService from '../../services/pipelines';

const pipelinesRouter = express.Router();

// Get all Pipelines and nested details
pipelinesRouter.get('/', async (_req: Request, res: Response) => {
  const pipelines = await pipelinesService.getAll();
  res.status(200).json(pipelines);
});

pipelinesRouter.get(
  '/pipelinesWithRecentRuns',
  async (req: Request, res: Response) => {
    const pipelines = await pipelinesService.getAllRecent();
    res.status(200).json(pipelines);
  },
);

// Get first Pipeline
pipelinesRouter.get('/first', async (_req: Request, res: Response) => {
  const pipeline = await pipelinesService.getFirst();
  res.status(200).json(pipeline);
});

// Get a Pipeline
pipelinesRouter.get('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  let pipeline;

  if (pipelineId === 'first') {
    pipeline = await pipelinesService.getFirst();
  } else {
    pipeline = await pipelinesService.getOne(pipelineId);
  }

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

// Update a Pipeline
pipelinesRouter.patch('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  const data = req.body;
  const updatedPipeline = await pipelinesService.updateOne(pipelineId, data);
  res.status(200).json(updatedPipeline);
});

export default pipelinesRouter;
