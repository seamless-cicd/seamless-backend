// router to handle webhooks

import express, { Request, Response } from 'express';

const webhooksRouter = express.Router();

webhooksRouter.post('', async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send();
  // res.status(200).json({message:'webhook handled'});
});

export default webhooksRouter;