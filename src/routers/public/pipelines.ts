import express, { Request, Response } from 'express';
import pipelinesService from '../../services/pipelines';

const pipelinesRouter = express.Router();

pipelinesRouter.get('/', async (req: Request, res: Response) => {
  const pipelinesData = await pipelinesService.getAll();
  res.status(200).json(pipelinesData);
});

pipelinesRouter.get('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  const pipelineData = await pipelinesService.getOne(pipelineId);
  res.status(200).json(pipelineData);
});

// Todo: Split env vars out (Cluster info) and insert separately
pipelinesRouter.post('', async (req: Request, res: Response) => {
  const data = req.body;
  const pipeline = await pipelinesService.createOne(data);
  res.status(200).json(pipeline);
});

pipelinesRouter.delete('/:pipelineId', async (req: Request, res: Response) => {
  const { pipelineId } = req.params;
  const deleted = pipelinesService.deleteOne(pipelineId);
  res.status(200).json(deleted);
});

export default pipelinesRouter;
