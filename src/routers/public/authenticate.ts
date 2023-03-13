import axios from 'axios';
import express, { Request, Response } from 'express';
import { GITHUB_CLIENT_SECRET } from '../../utils/config';
import { GITHUB_CLIENT_ID, GITHUB_OAUTH_URL } from '../../utils/constants';

const authRouter = express.Router();

authRouter.get('/access-token', async (req: Request, res: Response) => {
  // Supply the code from frontend so we can login on behalf of user
  const { data } = await axios(
    `${GITHUB_OAUTH_URL}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${req.query.code}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  // Pass access token back to frontend
  return res.json(data);
});

export default authRouter;
