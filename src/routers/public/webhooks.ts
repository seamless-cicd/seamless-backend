import { TriggerType } from '@prisma/client';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import { WebhookSchema } from '../../schemas/webhook-schema';
import githubService from '../../services/github';
import runsService from '../../services/runs';
import servicesService from '../../services/services';
import stagesService from '../../services/stages';
import stepFunctionsService from '../../services/step-functions';

config();

const webhooksRouter = express.Router();

// Process a webhook
webhooksRouter.post('/', async (req: Request, res: Response) => {
  // Immediately confirm receipt of webhook
  res.sendStatus(200);

  // Validate payload type
  const webhook = WebhookSchema.parse(req.body);

  try {
    // Extract relevant info from the webhook
    const commit = await githubService.processWebhook(webhook);

    if (commit) {
      // Find service linked to this webhook
      const service = await servicesService.findOneByRepoUrl(
        commit.githubRepoUrl,
      );
      if (!service) throw new Error('no service linked to this trigger');

      // Check if trigger matches
      if (
        (service.triggerOnMain && commit.triggerType === TriggerType.MAIN) ||
        (service.triggerOnPrOpen &&
          commit.triggerType === TriggerType.PR_OPEN) ||
        (service.triggerOnPrSync && commit.triggerType === TriggerType.PR_SYNC)
      ) {
        // Create new Run
        // Repo URL is not needed for Run creation
        const { githubRepoUrl, ...commitDataForRun } = commit;
        const run = await runsService.createOne(service.id, commitDataForRun);
        if (!run) throw new Error('error creating the run');

        // Create Stages linked to this Run
        await stagesService.createAll(run.id);

        // Start the Step Function (state machine)
        // await stepFunctionsService.start(run.id);

        // The returned run id will be used for navigation
        res.status(200).send(run.id);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default webhooksRouter;
