import { createOAuthUserAuth } from '@octokit/auth-oauth-user';
import express, { Request, Response } from 'express';
import { GITHUB_CLIENT_SECRET } from '../../utils/config';
import { GITHUB_CLIENT_ID } from '../../utils/constants';

const authRouter = express.Router();

// Get access token originally
authRouter.get('/access-token', async (req: Request, res: Response) => {
  // Temporary code supplied to the frontend by GitHub OAuth that we can use to
  const code = req.query.code;

  if (!code || typeof code !== 'string' || code.length === 0) {
    return res.status(400).send('No code provided');
  }

  // Authenticate with Github
  const auth = createOAuthUserAuth({
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    code,
  });

  const { token } = await auth();

  // Pass access token back to frontend
  return res.json({ token }).sendStatus(200);
});

export default authRouter;
