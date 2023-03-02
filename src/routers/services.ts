import express, { Request, Response } from 'express';
import servicesService from '../services/services';

const servicesRouter = express.Router();

// will get all services - assumes one pipeline
servicesRouter.get('/', async (req: Request, res: Response) => {
  const servicesData = await servicesService.getAll();
  res.status(200).json(servicesData);
});

export default servicesRouter;