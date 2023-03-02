import prisma from './prismaClient';

// runs are displayed for a particular service - all runs are not displayed  in a literal sense. only runs for a service are displayed
async function getAllForRun(runId: string) {
  try {
    const allStages = await prisma.stage.findMany({
      where: {
        runId: runId
      }
    });
    await prisma.$disconnect();
    return allStages;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAllForRun };