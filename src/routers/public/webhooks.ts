import express, { Request, Response } from 'express';
import { Octokit } from "@octokit/rest";
import { config } from 'dotenv'

config();
const PAT = process.env.PAT
const NGROK = process.env.NGROK

const webhooksRouter = express.Router();

const octokit = new Octokit({
  auth: PAT
});



webhooksRouter.post('', async (req: Request, res: Response) => {
  const event = req.headers['x-github-event'];
  const { ref, action } = req.body;
  console.log(event);
  console.log(ref);
  console.log(action);
  
  if (event === 'push' && /\/main$/.test(ref)) {
    console.log('push on main => trigger pipeline actions');
  }
  
  if (event === 'pull_request' && action === 'opened') {
    console.log('open pr => trigger pipeline');
  }

  if (event === 'pull_request' && action === 'synchronize') {
    console.log('sync pr => trigger pipeline');
  }
  
  res.status(200).send();
});

webhooksRouter.post('/create', async (req: Request, res: Response) => {
  // const { data } = await octokit.repos.get({
  //   owner: 'ls-jre',
  //   repo: 'webhook-generator'
  // });
  // console.log(data);

  const { data } = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
    owner: 'ls-jre',
    repo: 'webhook-generator',
    name: 'web', // this is default to create webhook
    active: true,
    events: [
      'push',
      'pull_request'
    ],
    config: {
      url: NGROK + '/api/webhooks', // url to deliver payloads so can ngrok this back to above route I believe
      content_type: 'json',
      insecure_ssl: '0'
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  
  res.status(200).json(data);
});

// creating a webhook in the user repo

export default webhooksRouter;