import express, { Request, Response } from 'express';
import servicesService from '../services/services';
import runsService from '../services/runs';
import stagesService from '../services/stages';
import stepFunctionsService from '../services/step-functions';

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

// Start a Step Function run for this service
servicesRouter.post(
  '/:serviceId/start',
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;
    try {
      // const newRun = await runsService.createOne(serviceId);
      // if (!newRun) throw new Error('Error creating the new Run');
      // await stagesService.createAll(newRun.id);
      const stepFunction = await stepFunctionsService.start(serviceId);
      res.status(200).json(stepFunction);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'There was a problem executing the Step Function' });
    }
  },
);

servicesRouter.patch('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const data = req.body;
  const updatedData = servicesService.updateOne(serviceId, data);
  res.status(200).json(updatedData);
});

export default servicesRouter;
