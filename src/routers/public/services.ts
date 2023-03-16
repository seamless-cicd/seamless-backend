import { ImageDetail } from '@aws-sdk/client-ecr';
import { Run } from '@prisma/client';
import express, { Request, Response } from 'express';
import runsService from '../../services/runs';
import servicesService from '../../services/services';
import stagesService from '../../services/stages';
import stepFunctionsService from '../../services/step-functions';

const servicesRouter = express.Router();

// Get all Services in the database - assumes all Services belong to a single pipeline
servicesRouter.get('/', async (req: Request, res: Response) => {
  const services = await servicesService.getAll();
  res.status(200).json(services);
});

// Get a Service
servicesRouter.get('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const service = await servicesService.getOne(serviceId);
  res.status(200).json(service);
});

// Create a Service, using form submission data
servicesRouter.post('/', async (req: Request, res: Response) => {
  const serviceFormData = req.body;
  const createdService = await servicesService.createOne(serviceFormData);
  res.status(200).json(createdService);
});

// Delete a Service
servicesRouter.delete('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const deletedService = await servicesService.deleteOne(serviceId);
  res.status(200).json(deletedService);
});

// Update a Service
servicesRouter.patch('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const serviceEditFormData = req.body;
  const updatedService = servicesService.updateOne(
    serviceId,
    serviceEditFormData,
  );
  res.status(200).json(updatedService);
});

// Start a Run for this Service
servicesRouter.post(
  '/:serviceId/start',
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    try {
      // Create a new Run and multiple Stages
      const run = await runsService.createOne(serviceId);

      if (!run)
        return res.status(500).json({ message: 'error creating the run' });

      await stagesService.createAll(run.id);

      // Start the Step Function (state machine)
      await stepFunctionsService.start(run.id);

      // The returned runId will be used for navigation
      res.status(200).send(run.id);
    } catch (error) {
      res.status(500).json({ message: 'error starting the run' });
    }
  },
);

// Retrieve all possible rollback images for this Service
servicesRouter.get(
  '/:serviceId/rollbacks',
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;
    const allImages = await servicesService.getRollbackImages(serviceId);
    const allRuns = await runsService.getAllForService(serviceId);
    if (
      !allImages ||
      allImages.length === 0 ||
      !allRuns ||
      allRuns.length === 0
    )
      return [];

    // For all runs, also retrieve ECR data and merge the two
    type Rollback = {
      runs: Run[];
      image: ImageDetail;
    };
    const rollbacks: Rollback[] = [];

    allImages.forEach((image) => {
      const associatedRuns = allRuns.filter((run) => {
        if (!run.commitHash) return;
        return image.imageTags?.includes(run.commitHash);
      });

      if (associatedRuns.length > 0) {
        rollbacks.push({ runs: associatedRuns, image });
      }
    });
    res.status(200).json(rollbacks);
  },
);

// Initiate a rollback to an existing Docker image tagged with a git commit hash
servicesRouter.post(
  '/:serviceId/rollbacks/:commitHash',
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
