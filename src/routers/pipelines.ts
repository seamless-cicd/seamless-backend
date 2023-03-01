import express, { Request, Response } from 'express';

const pipelinesRouter = express.Router();

pipelinesRouter.get('/', (req: Request, res: Response) => {
  // use prism ORM to retrieve data from db
  res.send('pipeline route');
});

export default pipelinesRouter;