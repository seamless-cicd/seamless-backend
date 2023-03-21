import express, { Request, Response } from 'express';
import { getApiGatewayUrl } from '../../utils/retrieve-env-vars';

const webhooksConfigRouter = express.Router();

webhooksConfigRouter.post('/create', async (req: Request, res: Response) => {
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) {
    BACKEND_URL = await getApiGatewayUrl('SeamlessHttpApi');
  }

  const { triggerOnMain, triggerOnPrSync, triggerOnPrOpen, githubRepoUrl } =
    req.body;
  const urlSections = githubRepoUrl.split('/');
  const owner = urlSections[urlSections.length - 2];
  const repo = urlSections[urlSections.length - 1];
  const events = [];

  if (triggerOnMain) {
    events.push('push');
  }
  if (triggerOnPrOpen || triggerOnPrSync) {
    events.push('pull_request');
  }

  // Add webhook
  const { data } = await req.octokit.request(
    'POST /repos/{owner}/{repo}/hooks',
    {
      owner: owner,
      repo: repo,
      name: 'web', // Default value to create a webhook
      active: true,
      events: events,
      config: {
        url: BACKEND_URL + '/api/webhooks',
        content_type: 'json',
        insecure_ssl: '0',
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  res.status(200).json({ data });
});

webhooksConfigRouter.patch('/patch', async (req: Request, res: Response) => {
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) {
    BACKEND_URL = await getApiGatewayUrl('SeamlessHttpApi');
  }

  const { triggerOnMain, triggerOnPrSync, triggerOnPrOpen, githubRepoUrl } =
    req.body;
  const urlSections = githubRepoUrl.split('/');
  const owner = urlSections[urlSections.length - 2];
  const repo = urlSections[urlSections.length - 1];
  const events = [];

  if (triggerOnMain) {
    events.push('push');
  }
  if (triggerOnPrOpen || triggerOnPrSync) {
    events.push('pull_request');
  }

  // Find the existing webhook to be updated
  const webhooks = await req.octokit.request(
    'GET /repos/{owner}/{repo}/hooks',
    {
      owner: owner,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  // Filter webhook based on endpoint
  const webhook = webhooks.data.filter((webhook) => {
    return webhook.config.url === BACKEND_URL + '/api/webhooks';
  })[0];

  // Update webhook
  const { data } = await req.octokit.request(
    'PATCH /repos/{owner}/{repo}/hooks/{hook_id}',
    {
      owner: owner,
      repo: repo,
      hook_id: webhook.id,
      name: 'web',
      active: true,
      events: events,
      config: {
        url: BACKEND_URL + '/api/webhooks',
        content_type: 'json',
        insecure_ssl: '0',
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  res.status(200).json(data);
});

export default webhooksConfigRouter;
