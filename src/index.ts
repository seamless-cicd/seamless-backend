import express from 'express';
import cors from 'cors';

import homeRouter from './routers/public/home';
import pipelinesRouter from './routers/public/pipelines';
import servicesRouter from './routers/public/services';
import runsRouter from './routers/public/runs';
import stagesRouter from './routers/public/stages';
import logsRouter from './routers/public/logs';
import webhooksRouter from './routers/public/webhooks';

const app = express();
app.use(express.json());
app.use(cors());

const publicRouter = express.Router();

publicRouter.use('/', homeRouter);
publicRouter.use('/pipelines', pipelinesRouter);
publicRouter.use('/services', servicesRouter);
publicRouter.use('/runs', runsRouter);
publicRouter.use('/stages', stagesRouter);
publicRouter.use('/logs', logsRouter);
publicRouter.use('/webhooks', webhooksRouter);

const privateRouter = express.Router();

// Consumed by the frontend
app.use('/api', publicRouter);

// AWS infra hits this internally
app.use('/internal', privateRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
