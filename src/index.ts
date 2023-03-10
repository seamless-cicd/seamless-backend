import cors from 'cors';
import express from 'express';

import statusUpdatesRouter from './routers/private/status-updates';
import homeRouter from './routers/public/home';
import logsRouter from './routers/public/logs';
import pipelinesRouter from './routers/public/pipelines';
import runsRouter from './routers/public/runs';
import servicesRouter from './routers/public/services';
import stagesRouter from './routers/public/stages';
import webhooksRouter from './routers/public/webhooks';
import { redisMiddleware } from './utils/redis-middleware';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);

// Public routes, consumed by the frontend
const publicRouter = express.Router();
publicRouter.use('/pipelines', pipelinesRouter);
publicRouter.use('/services', servicesRouter);
publicRouter.use('/runs', runsRouter);
publicRouter.use('/stages', stagesRouter);
publicRouter.use('/logs', redisMiddleware, logsRouter);
publicRouter.use('/webhooks', webhooksRouter);

app.use('/api', publicRouter);

// Private routes, hit by AWS infra
const privateRouter = express.Router();
privateRouter.use('/status-updates', statusUpdatesRouter);
app.use('/internal', privateRouter);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error: Error) => {
  // redisClient.quit();
  console.error(`Failed to start server: ${error}`);
});
