import { Status, TriggerType } from '@prisma/client';
import prisma from '../utils/prisma-client';
import stagesService from './stages';

// Get all Runs
async function getAll() {
  try {
    const runs = await prisma.run.findMany({});
    await prisma.$disconnect();
    return runs;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Get all Runs for a Service
async function getAllForService(serviceId: string) {
  try {
    const runs = await prisma.run.findMany({
      where: {
        serviceId: serviceId,
      },
    });
    await prisma.$disconnect();
    return runs;
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

// Create a Run with initial data
// Initial data may vary depending on whether it's a new run or a re-run
async function createOne(serviceId: string, data: any = {}) {
  try {
    const createdRun = await prisma.run.create({
      data: {
        triggerType: TriggerType.MAIN,
        serviceId: serviceId,
        ...data,
      },
    });
    await prisma.$disconnect();
    return createdRun;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create a Run and multiple placeholder Stages
// Performed each time the pipeline is executed
async function createRunAndStages(serviceId: string) {
  try {
    const createdRun = await createOne(serviceId);
    if (!createdRun) throw new Error('error creating the run');
    await stagesService.createAll(createdRun.id);
    return createdRun;
  } catch (e) {
    console.error(e);
  }
}

// Delete a Run
async function deleteOne(id: string) {
  try {
    const deletedRun = await prisma.run.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return deletedRun;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Update a Run
async function updateOne(id: string, data: any) {
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
  getAll,
  getAllForService,
  getOne,
  createOne,
  createRunAndStages,
  deleteOne,
  updateOne,
  updateRunStatus,
};
