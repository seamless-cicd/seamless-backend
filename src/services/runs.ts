import prisma from '../clients/prisma-client';
import { TriggerType } from '@prisma/client';

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

// async function updateRunStatus(
//   id: any,
//   data: Zod.infer<typeof pipelineStatusUpdateSchema>,
// ) {
//   try {
//     const updated = await prisma.run.update({
//       where: {
//         id: id,
//       },
//     });
//     await prisma.$disconnect();
//     return updated;
//   } catch (e) {
//     console.error(e);
//     await prisma.$disconnect();
//   }
// }

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

export default { getAllForService, getOne, createOne, deleteOne, updateOne };
