import express, { Request, Response } from 'express';
import servicesService from '../services/services';

const servicesRouter = express.Router();

// will get all services
servicesRouter.get('/', async (req: Request, res: Response) => {
  const servicesData = await servicesService.getAll();
  res.status(200).json(servicesData);
});

// will get all services for a pipeline
// if multiple pipelines this can be useful displaying all the services that belong to one pipeline
servicesRouter.get('/:pipelineID', async (req: Request, res: Response) => {
  const { pipelineID } = req.params;
  const serviceData = await servicesService.getAllForPipeline(pipelineID);
  res.status(200).json(serviceData);
});

export default servicesRouter;