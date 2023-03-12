import express, { Request, Response } from 'express';
import { Octokit } from "@octokit/rest";
import { config } from 'dotenv'


config();
const PAT = process.env.PAT
const NGROK = process.env.NGROK

const webhooksRouter = express.Router();





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
  // PAT is coming over from the body
  const { triggerOnMain, triggerOnPrSync, triggerOnPrOpen, githubPat, githubRepoUrl } = req.body;
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
  
  const octokit = new Octokit({
    auth: githubPat,
  });

  
  // parse owner and repo from the front end URL sent then insert them here
  // also need to put in the events based off of what they checked
  // url will be the url for this backend so that will eventually be something in aws - ask team about this


  const { data } = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
    owner: owner,
    repo: repo,
    name: 'web', // this is default to create webhook
    active: true,
    events: events,
    config: {
      url: NGROK + '/api/webhooks', // url to deliver payloads so can ngrok this back to above route I believe
      content_type: 'json',
      insecure_ssl: '0'
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  // HARDCODED DATA WORKING
  // const { data } = await octokit.request('POST /repos/{owner}/{repo}/hooks', {
  //   owner: 'ls-jre',
  //   repo: 'webhook-generator',
  //   name: 'web', // this is default to create webhook
  //   active: true,
  //   events: [
  //     'push',
  //     'pull_request'
  //   ],
  //   config: {
  //     url: NGROK + '/api/webhooks', // url to deliver payloads so can ngrok this back to above route I believe
  //     content_type: 'json',
  //     insecure_ssl: '0'
  //   },
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28'
  //   }
  // })
  
  res.status(200).json(data);
});

// creating a webhook in the user repo

export default webhooksRouter;