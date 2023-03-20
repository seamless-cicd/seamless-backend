import express, { Request, Response } from 'express';
import dashboardService from '../../services/dashboard'

const dashboardRouter = express.Router();

dashboardRouter.get('/servicesWithRuns', async (req: Request, res: Response) => {
  const servicesWithRuns = await dashboardService.getServicesWithRuns();
  res.status(200).json(servicesWithRuns);
});

dashboardRouter.get('/runStatusCount', async (req: Request, res: Response) => {
  const runStatusCount = await dashboardService.getRunStatusCount();
  res.status(200).json(runStatusCount);
});

dashboardRouter.get('/stageStatusCount', async (req: Request, res: Response) => {
  const stageStatusCount = await dashboardService.getStageStatusCount();
  res.status(200).json(stageStatusCount);
});


export default dashboardRouter;
