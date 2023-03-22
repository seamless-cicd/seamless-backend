import { PipelineFormType } from '../schemas/form-schema';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../utils/config';
import prisma from '../utils/prisma-client';

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

// Get all Pipelines and nested details
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

// Get all Pipelines with Runs performed within the last 2 weeks
async function getAllRecent() {
  try {
    const pipelines = await prisma.pipeline.findMany({
      include: {
        services: {
          include: {
            runs: {
              where: {
                createdAt: {
                  gte: twoWeeksAgo,
                },
              },
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

// Get a Pipeline
async function getOne(pipelineId: string) {
  try {
    const pipeline = await prisma.pipeline.findUnique({
      where: {
        id: pipelineId,
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
// User doesn't enter GitHub data in the form; those are hardcoded in the CDK
async function createOne(pipelineFormData: PipelineFormType) {
  try {
    const createdPipeline = await prisma.pipeline.create({
      data: {
        ...pipelineFormData,
        githubClientId: GITHUB_CLIENT_ID,
        githubClientSecret: GITHUB_CLIENT_SECRET,
      },
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
    const deletedPipeline = await prisma.pipeline.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return deletedPipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAll, getAllRecent, getOne, getFirst, createOne, deleteOne };
