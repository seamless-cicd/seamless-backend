import prisma from './prismaClient';
import { TriggerType  } from '@prisma/client';

// runs are displayed for a particular service - all runs are not displayed  in a literal sense. only runs for a service are displayed
async function getAllForService(serviceId: any) {
  try {
    const allRuns = await prisma.run.findMany({
      where: {
        serviceId: serviceId
      }
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
        id: runId
      }
    });
    await prisma.$disconnect();
    return run;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// serviceId has to already exist in service table to satisfy foreign key constraint
async function createOne(serviceId: any) {
  try {
    const run = await prisma.run.create({
      data: {
        startedAt: new Date(),
        triggerType: TriggerType.COMMIT,
        serviceId: serviceId,
      }
    });
    await prisma.$disconnect();
    return run;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAllForService, getOne, createOne };