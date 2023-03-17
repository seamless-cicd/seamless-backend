import { config } from 'dotenv';
import express, { Request, Response } from 'express';
config();

// const triggerMainSchema

const webhooksRouter = express.Router();

webhooksRouter.post('/', async (req: Request, res: Response) => {
  const event = req.headers['x-github-event'];
  const { ref, action } = req.body;
  console.log(event);
  console.log(ref);
  console.log(action);

  if (event === 'push' && /\/main$/.test(ref)) {
    // const commitData = {
    //   commitHash: event.after,
    //   commitMessage: event,
    //   committer: event.pusher.name,
    // };
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

export default webhooksRouter;
