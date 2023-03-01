import express, { Request, Response } from 'express';

const homeRouter = express.Router();

homeRouter.get('/', (req: Request, res: Response) => {
  res.send('Seemless CI/CD Home');
});

export default homeRouter;