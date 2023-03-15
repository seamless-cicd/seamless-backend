import { Status, TriggerType } from '@prisma/client';
import prisma from '../utils/prisma-client';

// runs are displayed for a particular service - all runs are not displayed  in a literal sense. only runs for a service are displayed
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

// method to create a run - will be used to create empty run
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

async function updateRunStatus(id: string, status: Status) {
  try {
    const originalRun = await prisma.run.findUnique({
      where: {
        id: id,
      },
    });

    if (!originalRun) {
      throw new Error('Original run is non-existent');
    }

    const endedAt = new Date();
    const runEnded = status === Status.FAILURE || Status.SUCCESS;

    const duration = Math.floor(
      (endedAt.getTime() - originalRun.startedAt.getTime()) / 1000,
    );

    const updated = await prisma.run.update({
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
    return updated;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// similar to above but this function taken from service and reused to update data points
// used to update data from postman to test long polling
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

export default {
  getAllForService,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  updateRunStatus,
};
