import express, { Request, Response } from 'express';
import pipelinesService from '../services/pipelines';

const pipelinesRouter = express.Router();

pipelinesRouter.get('/', async (req: Request, res: Response) => {
  const pipelinesData = await pipelinesService.getAll();
  res.status(200).json(pipelinesData);
});

pipelinesRouter.get('/:pipelineID', async (req: Request, res: Response) => {
  const { pipelineID } = req.params;
  const pipelineData = await pipelinesService.getOne(pipelineID);
  res.status(200).json(pipelineData);

  // pipelines/349-ekei2939
});

export default pipelinesRouter;