/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from 'express';
import { webSocketsConnectionManager } from '../../utils/websockets';

const websocketsRouter = express.Router();

// `/connect` route activates upon new connections to Websockets API
websocketsRouter.post('/connect', async (req: Request, res: Response) => {
  const connectionId = req.body.connectionId;

  if (!connectionId) {
    throw new Error('No connection ID passed');
  }

  console.log(`Client with id ${connectionId} connected to Websockets`);

  webSocketsConnectionManager.addConnection(connectionId);

  return res.sendStatus(200);
});

// `/disconnect` route activates when clients disconnect from Websockets API
websocketsRouter.delete('/disconnect', async (req: Request, res: Response) => {
  const connectionId = req.body.connectionId;

  if (!connectionId) {
    throw new Error('No connection ID passed');
  }

  console.log(`Client with id ${connectionId} disconnected from Websockets`);

  webSocketsConnectionManager.deleteConnection(connectionId);

  return res.sendStatus(200);
});

export default websocketsRouter;
