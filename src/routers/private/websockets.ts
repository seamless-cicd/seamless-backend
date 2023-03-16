/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import express, { Request, Response } from 'express';
import { WEBSOCKETS_API_URL } from '../../utils/config';
import { deleteConnection } from '../../utils/websockets';

const websocketsRouter = express.Router();

const connectionIds: string[] = [];

// `/connect` route activates upon new connections to Websockets API
websocketsRouter.post('/connect', async (req: Request, res: Response) => {
  const connectionId = req.body.connectionId;

  if (!connectionId) {
    throw new Error('No connection ID passed');
  }

  console.log(`Client with ${connectionId} connected to Websockets`);

  connectionIds.push(connectionId);

  return res.sendStatus(200);
});

// `/disconnect` route activates when clients disconnect from Websockets API
websocketsRouter.delete('/disconnect', async (req: Request, res: Response) => {
  const connectionId = req.body.connectionId;

  if (!connectionId) {
    throw new Error('No connection ID passed');
  }

  console.log(`Client with ${connectionId} disconnected from Websockets`);

  deleteConnection(connectionIds, connectionId);

  return res.sendStatus(200);
});

// TEMPORARY: Route for posting messages to the client
websocketsRouter.post('/send-message', async (_: Request, res: Response) => {
  const client = new ApiGatewayManagementApiClient({
    endpoint: WEBSOCKETS_API_URL,
    region: 'us-east-1',
  });

  const string = 'Hello World!';
  const data = Uint8Array.from(string.split('').map((x) => x.charCodeAt(0)));

  const postToConnectionCalls = connectionIds.map(async (connectionId) => {
    try {
      const requestParams = {
        ConnectionId: connectionId,
        Data: data,
      };
      const command = new PostToConnectionCommand(requestParams);
      await client.send(command);
    } catch (e) {
      // @ts-ignore
      if (e && e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        deleteConnection(connectionIds, connectionId);
      } else {
        throw e;
      }
    }
  });

  try {
    await Promise.all(postToConnectionCalls);
    console.log(`Messages to clients were sent.`);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default websocketsRouter;
