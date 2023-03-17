import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import {
  MainWebhookSchema,
  PullRequestWebhookSchema,
} from '../../schemas/webhookSchema';
import githubService from '../../services/github';
config();

const webhooksRouter = express.Router();
const token = process.env.GITHUB_OAUTH_TOKEN;

webhooksRouter.post('/', async (req: Request, res: Response) => {
  const { body: webhookData } = req;
  const event = req.headers['x-github-event'];

  if (
    event === 'push' &&
    webhookData.ref === 'refs/heads/main' &&
    MainWebhookSchema.safeParse(webhookData).success
  ) {
    const commitData = {
      commitHash: webhookData.head_commit.id,
      commitMessage: webhookData.head_commit.message,
      committer: webhookData.head_commit.author.name,
    };

    console.log('Push to main');
    console.log(commitData);
  }

  if (
    event === 'pull_request' &&
    webhookData.action === 'opened' &&
    PullRequestWebhookSchema.safeParse(webhookData).success
  ) {
    const fullCommitData = await githubService.getCommit(
      token,
      webhookData.pull_request.head.repo.owner.login,
      webhookData.pull_request.head.repo.name,
      webhookData.pull_request.head.sha,
    );
    const commitData = {
      commitHash: fullCommitData?.data.sha,
      commitMessage: fullCommitData?.data.message,
      committer: fullCommitData?.data.author.name,
    };

    console.log('Open PR');
    console.log(commitData);
  }

  if (
    event === 'pull_request' &&
    webhookData.action === 'synchronize' &&
    PullRequestWebhookSchema.safeParse(webhookData).success
  ) {
    const fullCommitData = await githubService.getCommit(
      token,
      webhookData.pull_request.head.repo.owner.login,
      webhookData.pull_request.head.repo.name,
      webhookData.pull_request.head.sha,
    );
    const commitData = {
      commitHash: fullCommitData?.data.sha,
      commitMessage: fullCommitData?.data.message,
      committer: fullCommitData?.data.author.name,
    };

    console.log('Sync PR');
    console.log(commitData);
  }

  res.status(200).send();
});

export default webhooksRouter;
