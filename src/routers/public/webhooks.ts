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

  try {
    // Validate payload type
    const webhook = WebhookSchema.safeParse(req.body);
    // Ignore operations that are not on main or associated with a PR
    if (!webhook.success) return;

    // Extract relevant info from the webhook
    const commit = await githubService.processWebhook(webhook.data);

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
        // Repo URL is not needed for Run creation; it pertains to the Service only
        const { githubRepoUrl, ...commitDataForRun } = commit;

        const run = await runsService.createOne(service.id, commitDataForRun);
        if (!run) throw new Error('error creating the run');

        // Create Stages linked to this Run
        await stagesService.createAll(run.id);

        // Start the Step Function (state machine)
        const response = await stepFunctionsService.start(run.id);
        console.log(JSON.stringify(response, null, 2));
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export default webhooksRouter;
