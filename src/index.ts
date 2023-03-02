import express from 'express';
import cors from 'cors';

import homeRouter from './routers/home';
import pipelinesRouter from './routers/pipelines';
import servicesRouter from './routers/services';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/pipelines', pipelinesRouter);
app.use('/services', servicesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

