import express, { Request, Response } from 'express';
import apiGatewaysService from '../../services/api-gateway';

const homeRouter = express.Router();

homeRouter.get('/', async (req: Request, res: Response) => {
  const BACKEND_URL = await apiGatewaysService.getApiGatewayUrl(
    'SeamlessWebsocketsApi',
  );
  console.log(BACKEND_URL);
  res.send('Seamless CI/CD Home');
});

export default homeRouter;
