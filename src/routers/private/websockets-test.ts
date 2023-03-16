import express, { Request, Response } from 'express';
import { deleteConnection } from '../../utils/websockets';

const websocketsTestRouter = express.Router();

const connectionIds: string[] = [];

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

// `/disconnect` route activates when clients disconnect from Websockets API
websocketsTestRouter.delete(
  '/disconnect',
  async (req: Request, res: Response) => {
    const connectionId = req.body.connectionId;

    if (!connectionId) {
      throw new Error('No connection ID passed');
    }

    console.log(`Client with ${connectionId} disconnected from Websockets`);

    deleteConnection(connectionIds, connectionId);

    return res.sendStatus(200);
  },
);

export default websocketsTestRouter;
