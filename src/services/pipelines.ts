import prisma from '../utils/prisma-client';

// Get all Pipelines
async function getAll() {
  try {
    const pipelines = await prisma.pipeline.findMany({
      include: {
        services: {
          include: {
            runs: {
              include: {
                stages: {},
              },
            },
          },
        },
      },
    });

    await prisma.$disconnect();
    return pipelines;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Get one Pipeline by id
async function getOne(pipelineID: string) {
  try {
    const pipeline = await prisma.pipeline.findUnique({
      where: {
        id: pipelineID,
      },
      include: {
        services: {
          include: {
            runs: {
              include: {
                stages: {},
              },
            },
          },
        },
      },
    });

    await prisma.$disconnect();
    return pipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Get first Pipeline
async function getFirst() {
  try {
    const pipeline = await prisma.pipeline.findFirst({});
    if (!pipeline) return null;

    await prisma.$disconnect();
    return pipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create a Pipeline
async function createOne(pipelineData: any) {
  try {
    const createdPipeline = await prisma.pipeline.create({
      data: pipelineData,
    });

    await prisma.$disconnect();
    return createdPipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Delete a Pipeline
async function deleteOne(id: string) {
  try {
    const pipeline = await prisma.pipeline.delete({
      where: {
        id: id,
      },
    });

    await prisma.$disconnect();
    return pipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAll, getOne, getFirst, createOne, deleteOne };
