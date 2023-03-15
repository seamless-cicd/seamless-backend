import express, { Request, Response } from 'express';
import servicesService from '../../services/services';

const servicesRouter = express.Router();

// will get all services - assumes one pipeline
servicesRouter.get('/', async (req: Request, res: Response) => {
  const servicesData = await servicesService.getAll();
  res.status(200).json(servicesData);
});

servicesRouter.get('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const serviceData = await servicesService.getOne(serviceId);
  res.status(200).json(serviceData);
});

// will post data when a new service is created via form
servicesRouter.post('/', async (req: Request, res: Response) => {
  const serviceData = req.body;
  const dbResponse = await servicesService.createOne(serviceData);
  res.status(200).json(dbResponse);
});

servicesRouter.delete('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const deleteData = await servicesService.deleteOne(serviceId);
  res.status(200).json(deleteData);
});

servicesRouter.patch('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const data = req.body;
  const updatedData = servicesService.updateOne(serviceId, data);
  res.status(200).json(updatedData);
});

servicesRouter.post(
  '/:serviceId/rollback/:commitHash',
  async (req: Request, res: Response) => {
    const { serviceId, commitHash } = req.params;
    const ecsServiceUpdateResponse = await servicesService.rollback(
      serviceId,
      commitHash,
    );
    res.status(200).json(ecsServiceUpdateResponse);
  },
);

export default servicesRouter;
