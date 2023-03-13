import { createOAuthUserAuth } from '@octokit/auth-oauth-user';
import express, { Request, Response } from 'express';
import { GITHUB_CLIENT_SECRET } from '../../utils/config';
import { GITHUB_CLIENT_ID } from '../../utils/constants';

const authRouter = express.Router();

authRouter.get('/access-token', async (req: Request, res: Response) => {
  // Temporary code supplied to the frontend by GitHub OAuth that we can use to
  // get an access token
  const code = req.query.code;

  if (!code || typeof code !== 'string' || code.length === 0) {
    return res.status(400).send('No code provided');
  }

  const auth = createOAuthUserAuth({
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    code,
  });

  const { token } = await auth();

  // Pass access token back to frontend
  return res.json({ token }).send(200);
});

// Test we can access user data
authRouter.get('/user-data', async (req: Request, res: Response) => {
  // Make an authorized request with OAuth
});

export default authRouter;
