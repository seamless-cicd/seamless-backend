import { Status, TriggerType } from '@prisma/client';
import prisma from '../utils/prisma-client';
import stagesService from './stages';

// Get all Runs for a Service
async function getAllForService(serviceId: any) {
  try {
    const allRuns = await prisma.run.findMany({
      where: {
        serviceId: serviceId,
      },
    });
    await prisma.$disconnect();
    return allRuns;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Get a Run
async function getOne(runId: string) {
  try {
    const run = await prisma.run.findUnique({
      where: {
        id: runId,
      },
    });
    await prisma.$disconnect();
    return run;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create a Run with initial default data
async function createOne(serviceId: any) {
  try {
    const run = await prisma.run.create({
      data: {
        startedAt: new Date(),
        triggerType: TriggerType.MAIN,
        serviceId: serviceId,
      },
    });
    await prisma.$disconnect();
    return run;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create a placeholder Run and associated Stages, for a Service
// Performed each time the pipeline is executed
async function createRunAndStages(serviceId: string) {
  try {
    const run = await createOne(serviceId);
    if (!run) throw new Error('error creating the run');
    await stagesService.createAll(run.id);
    return run;
  } catch (e) {
    console.error(e);
  }
}

// Delete a Run
async function deleteOne(id: any) {
  try {
    const deleted = await prisma.run.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return deleted;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Update a Run
async function updateOne(id: any, data: any) {
  try {
    const updated = await prisma.run.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return updated;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Update status and duration of a Run, using status updates sent by the state machine
async function updateRunStatus(id: string, status: Status) {
  try {
    const run = await prisma.run.findUnique({
      where: {
        id: id,
      },
    });

    if (!run) {
      throw new Error('run does not exist');
    }

    const endedAt = new Date();
    const runEnded = status === Status.FAILURE || Status.SUCCESS;

    const duration = Math.floor(
      (endedAt.getTime() - run.startedAt.getTime()) / 1000,
    );

    const updatedRun = await prisma.run.update({
      where: {
        id: id,
      },
      data: {
        status,
        endedAt: runEnded ? endedAt : null,
        duration: runEnded ? duration : null,
      },
    });

    await prisma.$disconnect();
    return updatedRun;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default {
  getAllForService,
  getOne,
  createOne,
  createRunAndStages,
  deleteOne,
  updateOne,
  updateRunStatus,
};
