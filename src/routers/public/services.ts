import { ImageDetail } from '@aws-sdk/client-ecr';
import { Run } from '@prisma/client';
import express, { Request, Response } from 'express';
import runsService from '../../services/runs';
import servicesService from '../../services/services';
import stagesService from '../../services/stages';

const servicesRouter = express.Router();

// Get all Services in the database - assumes all Services belong to a single pipeline
servicesRouter.get('/', async (_req: Request, res: Response) => {
  const services = await servicesService.getAll();
  res.status(200).json(services);
});

// Get a Service
servicesRouter.get('/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const service = await servicesService.getOne(serviceId);
  res.status(200).json(service);
});

// Create a Service, using form data
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

// Placeholder: Doesn't actually execute the pipeline
// Create a new Run and Stages for the Service
servicesRouter.post(
  '/:serviceId/start',
  async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    try {
      const run = await runsService.createOne(serviceId);
      if (!run)
        return res.status(500).json({ message: 'error creating the run' });

      await stagesService.createAll(run.id);
      res.status(200).send(run.id);
    } catch (error) {
      res.status(500).json({ message: 'error starting the run' });
    }
  },
);

// Retrieve all rollback images for this Service
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

    // Merge Run data with Docker image data from ECR
    type Rollback = {
      runs: Run[];
      image: ImageDetail;
    };
    const rollbacks: Rollback[] = [];

    // Compare Images Array with Runs Array and find matches based on commit hash
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

// Perform a rollback
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
