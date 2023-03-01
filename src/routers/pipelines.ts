import express, { Request, Response } from 'express';
import pipelinesService from '../services/pipelines';

const pipelinesRouter = express.Router();

pipelinesRouter.get('/', async (req: Request, res: Response) => {
  const pipelinesData = await pipelinesService.getAll();
  res.status(200).json(pipelinesData);
});

export default pipelinesRouter;