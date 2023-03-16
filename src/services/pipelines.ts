import { EnvironmentVariable, Pipeline, ResourceType } from '@prisma/client';
import prisma from '../utils/prisma-client';
import envVarsService from './envVars';

export interface PipelineWithEnvVars extends Pipeline {
  awsRegion: string;
  awsAccountId: string;
  awsEcsClusterStaging?: string;
  awsEcsCluster: string;
  awsStepFunction: string;
  awsRds: string;
  awsElastiCache: string;
}

async function getAll() {
  try {
    const allPipelines = await prisma.pipeline.findMany({
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

    // Retrieve env vars for all pipelines
    const envVars = await envVarsService.getAll(ResourceType.PIPELINE);
    // Group env vars by pipeline id
    const groupedEnvVars = envVars?.reduce(
      (entryMap, e) =>
        entryMap.set(e.resourceId, [...(entryMap.get(e.resourceId) || []), e]),
      new Map(),
    );
    // Insert into the associated pipeline object inside allPipelines
    allPipelines.forEach((pipeline) => {
      const envVarsForPipeline: EnvironmentVariable[] = groupedEnvVars?.get(
        pipeline.id,
      );
      const flattenedEnvVars: { [key: string]: string } = {};
      envVarsForPipeline?.forEach((envVar) => {
        flattenedEnvVars[envVar.name] = envVar.value;
      });
      Object.assign(pipeline, flattenedEnvVars);
    });

    await prisma.$disconnect();
    return allPipelines;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

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

    // Retrieve env vars for this pipeline
    const envVars = await envVarsService.getOne(
      ResourceType.PIPELINE,
      pipelineID,
    );
    // Insert env vars into the pipeline object
    const flattenedEnvVars: { [key: string]: string } = {};
    envVars?.forEach((envVar) => {
      flattenedEnvVars[envVar.name] = envVar.value;
    });

    await prisma.$disconnect();
    return { ...pipeline, ...flattenedEnvVars } as PipelineWithEnvVars;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function createOne(data: any) {
  try {
    const pipeline = await prisma.pipeline.create({
      data: data,
    });
    await prisma.$disconnect();
    return pipeline;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}
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

export default { getAll, getOne, createOne, deleteOne };
