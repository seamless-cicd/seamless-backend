import express, { Request, Response } from 'express';
import path from 'path';

const homeRouter = express.Router();

const frontendPath = path.join(__dirname, '../../../dist/frontend');

homeRouter.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

export default homeRouter;
