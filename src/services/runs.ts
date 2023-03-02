import prisma from './prismaClient';

// runs are displayed for a particular service - all runs are not displayed  in a literal sense. only runs for a service are displayed
async function getAllForService(serviceId: string) {
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

export default { getAllForService };