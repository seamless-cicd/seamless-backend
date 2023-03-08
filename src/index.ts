import express from 'express';
import cors from 'cors';

import homeRouter from './routers/home';
import pipelinesRouter from './routers/pipelines';
import servicesRouter from './routers/services';
import runsRouter from './routers/runs';
import stagesRouter from './routers/stages';
import webhooksRouter from './routers/webhooks';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/pipelines', pipelinesRouter);
app.use('/services', servicesRouter);
app.use('/runs', runsRouter);
app.use('/stages', stagesRouter);
app.use('/webhooks', webhooksRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

