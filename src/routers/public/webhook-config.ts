import { config } from 'dotenv';
import express, { Request, Response } from 'express';
config();
// PAT for testing if you don't want to use submitted PAT from form
// const PAT = process.env.PAT
const BACKEND_URL = process.env.BACKEND_URL;

const webhooksConfigRouter = express.Router();

webhooksConfigRouter.post('/create', async (req: Request, res: Response) => {
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

  await req.octokit.request('GET /repos/{owner}/{repo}/hooks', {
    owner: owner,
    repo: repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // URL will eventually have to be updated to that of user
  const { data } = await req.octokit.request(
    'POST /repos/{owner}/{repo}/hooks',
    {
      owner: owner,
      repo: repo,
      name: 'web', // this is default to create webhook
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

  // first find the existing webhooks - necessary to find the one that needs patching
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

  // filter based off of the webhook with defined endpoint here
  const webhook = webhooks.data.filter((webhook) => {
    return webhook.config.url === BACKEND_URL + '/api/webhooks';
  });
  // save id
  const webhookId = webhook[0].id;

  // patch it here with octokit - hook_id is what determines the hook
  const { data } = await req.octokit.request(
    'PATCH /repos/{owner}/{repo}/hooks/{hook_id}',
    {
      owner: owner,
      repo: repo,
      hook_id: webhookId,
      name: 'web', // this is default to create webhook
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
