import express, { Request, Response } from 'express';
import { getApiGatewayUrl } from '../../utils/retrieve-env-vars';

const websocketsUrlRouter = express.Router();

// Used by the Frontend to get the WebSockets API Gateway URL
websocketsUrlRouter.get('/', async (_req: Request, res: Response) => {
  const WEBSOCKETS_API_URL =
    process.env.WEBSOCKETS_API_URL ||
    (await getApiGatewayUrl('SeamlessWebsocketsApi'));

  return res.json({
    WEBSOCKETS_API_URL: `wss${WEBSOCKETS_API_URL?.slice(5)}`,
  });
});

export default websocketsUrlRouter;
