import express, { Request, Response } from 'express';

const homeRouter = express.Router();

homeRouter.get('/', async (_req: Request, res: Response) => {
  res.send('Seamless CI/CD Home');
});

export default homeRouter;
