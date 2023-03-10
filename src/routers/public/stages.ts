import express, { Request, Response } from 'express';
import stagesService from '../../services/stages';

const stagesRouter = express.Router();

// will get all runs for a particular service
stagesRouter.get('', async (req: Request, res: Response) => {
  const { runId } = req.query;
  const serviceData = await stagesService.getAllForRun(runId);
  res.status(200).json(serviceData);
});

stagesRouter.delete('/:stageId', async (req: Request, res: Response) => {
  const { stageId } = req.params;
  const deleteData = await stagesService.deleteOne(stageId);
  res.status(200).json(deleteData);
});

// added to test with postman updating stage status so that it can be polled from the front end
stagesRouter.patch('/:stageId', async (req: Request, res: Response) => {
  const { stageId } = req.params;
  const data = req.body;
  const updatedData = stagesService.updateOne(stageId, data);
  res.status(200).json(updatedData);
});

export default stagesRouter;

