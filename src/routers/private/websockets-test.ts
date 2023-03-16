import express, { Request, Response } from 'express';

const websocketsTestRouter = express.Router();

const connectionIds = [];

// `/connect` route activates upon new connections to Websockets API
websocketsTestRouter.post('/connect', async (req: Request, res: Response) => {
  const connectionId = req.body.connectionId;

  if (!connectionId) {
    throw new Error('No connection ID passed');
  }

  console.log(`Client with ${connectionId} connected to Websockets`);

  connectionIds.push(connectionId);

  return res.sendStatus(200);
});

export default statusUpdatesRouter;
