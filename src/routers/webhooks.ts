import { z } from 'zod';
import express, { Request, Response } from 'express';

const webhooksRouter = express.Router();

// Fields required by the state machine
const webhookSchema = z.object({
  commitHash: z.string(),
  commitMessage: z.string(),
  committer: z.string(),
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

  // Format webhook data using required schema

  res.status(200).send();
});

export default webhooksRouter;
