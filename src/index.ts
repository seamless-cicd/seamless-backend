import express from 'express';
import cors from 'cors';

import homeRouter from './routers/home';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', homeRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});

