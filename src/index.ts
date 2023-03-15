import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import statusUpdatesRouter from './routers/private/status-updates';
import authRouter from './routers/public/authentication';
import homeRouter from './routers/public/home';
import createLogsRouter from './routers/public/logs';
import pipelinesRouter from './routers/public/pipelines';
import runsRouter from './routers/public/runs';
import servicesRouter from './routers/public/services';
import stagesRouter from './routers/public/stages';
import { userRouter } from './routers/public/user';
import webhooksRouter from './routers/public/webhooks';
import { redisClient } from './utils/redis-client';

import webhooksConfigRouter from './routers/public/webhook-config';
import { authMiddleware } from './utils/auth-middleware';
import { BACKEND_PORT } from './utils/config';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);

// Public routes, consumed by the frontend
const publicRouter = express.Router();
publicRouter.use('/auth', authRouter);
publicRouter.use('/logs', createLogsRouter(redisClient));
publicRouter.use('/webhooks', webhooksRouter);
publicRouter.use('/webhooks-config', authMiddleware, webhooksConfigRouter);
publicRouter.use('/user', authMiddleware, userRouter);
publicRouter.use('/pipelines', authMiddleware, pipelinesRouter);
publicRouter.use('/services', authMiddleware, servicesRouter);
publicRouter.use('/runs', authMiddleware, runsRouter);
publicRouter.use('/stages', authMiddleware, stagesRouter);
publicRouter.use('/user', authMiddleware, userRouter);

app.use('/api', publicRouter);

// Private routes, hit by AWS infra
const privateRouter = express.Router();
privateRouter.use('/status-updates', statusUpdatesRouter);
app.use('/internal', privateRouter);

const PORT = BACKEND_PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error: Error) => {
  redisClient.quit();
  console.error(`Failed to start server: ${error}`);
});

server.on('close', () => {
  console.log('Server shutting down');
  redisClient.quit(() => {
    console.log('Redis client disconnected');
  });
});
