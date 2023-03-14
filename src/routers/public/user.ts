import express, { Request, Response } from 'express';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { data } = await req.octokit.request('GET /user');

  return res.json({ login: data.login, avatar_url: data.avatar_url }).send();
});
