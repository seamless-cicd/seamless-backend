import prisma from './prismaClient';

// gets all services - only top level data
async function getAll() {
  try {
    const allServices = await prisma.service.findMany();
    await prisma.$disconnect();
    return allServices;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// will get all services for a pipeline
// if multiple pipelines this can be useful displaying all the services that belong to one pipeline
async function getAllForPipeline(pipelineId: string) {
  try {
    const allServices = await prisma.service.findMany({
      where: {
        pipelineId: pipelineId
      }
    });
    await prisma.$disconnect();
    return allServices;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAll, getAllForPipeline };