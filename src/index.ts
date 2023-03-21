import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import './utils/retrieve-env-vars';

import authRouter from './routers/public/authentication';
import dashboardRouter from './routers/public/dashboard';
import homeRouter from './routers/public/home';
import createLogsRouter from './routers/public/logs';
import pipelinesRouter from './routers/public/pipelines';
import runsRouter from './routers/public/runs';
import servicesRouter from './routers/public/services';
import stagesRouter from './routers/public/stages';
import { userRouter } from './routers/public/user';
import webhooksConfigRouter from './routers/public/webhook-config';
import webhooksRouter from './routers/public/webhooks';
import websocketsUrlRouter from './routers/public/websockets-url';

import createLogUpdatesRouter from './routers/private/log-updates';
import statusUpdatesRouter from './routers/private/status-updates';
import websocketsRouter from './routers/private/websockets';

import { authMiddleware } from './utils/auth-middleware';
import { BACKEND_PORT } from './utils/config';
import { redisClient } from './utils/redis-client';

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/', homeRouter);
const frontendPath = path.join(__dirname, '../public');
app.use(express.static(frontendPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Public routes, consumed by the frontend
const publicRouter = express.Router();
publicRouter.use('/auth', authRouter);
publicRouter.use('/webhooks', webhooksRouter);
publicRouter.use('/logs', authMiddleware, createLogsRouter(redisClient));
publicRouter.use('/webhooks-config', authMiddleware, webhooksConfigRouter);
publicRouter.use('/user', authMiddleware, userRouter);
publicRouter.use('/pipelines', authMiddleware, pipelinesRouter);
publicRouter.use('/services', authMiddleware, servicesRouter);
publicRouter.use('/runs', authMiddleware, runsRouter);
publicRouter.use('/stages', authMiddleware, stagesRouter);
publicRouter.use('/user', authMiddleware, userRouter);
publicRouter.use('/websockets-url', authMiddleware, websocketsUrlRouter);
publicRouter.use('/dashboard', authMiddleware, dashboardRouter);

app.use('/api', publicRouter);

// Private routes, hit by AWS infra
const privateRouter = express.Router();
privateRouter.use('/status-updates', statusUpdatesRouter);
privateRouter.use('/log-updates', createLogUpdatesRouter(redisClient));
privateRouter.use('/websockets', websocketsRouter);
app.use('/internal', privateRouter);

const PORT = BACKEND_PORT || 3000;

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
