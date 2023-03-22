import express, { Request, Response } from 'express';
import pipelinesService from '../../services/pipelines';

const dashboardRouter = express.Router();

dashboardRouter.get(
  '/pipelineWithRecentRuns',
  async (req: Request, res: Response) => {
    const pipelineWithRecentRuns = await pipelinesService.getAllRecent();
    res.status(200).json(pipelineWithRecentRuns);
  },
);

export default dashboardRouter;
