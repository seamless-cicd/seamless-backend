import { PrismaClient } from '@prisma/client';
import { pipelineSeedQuery } from './seed_pipelines';
import { envVarPipelineSeedData, envVarServiceSeedData } from './seed_envvars';
import { deleteAllData } from './delete_all_data';
import { queryTimer } from './query_timer';

const prisma = new PrismaClient();
prisma.$use(queryTimer);

// Cannot use createMany with nested writes
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-multiple-records-and-multiple-related-records
async function seedPipelinesData() {
  await Promise.all(
    pipelineSeedQuery.map((pipelineData) =>
      prisma.pipeline.create({
        data: pipelineData,
      }),
    ),
  );

  const allPipelines = await prisma.pipeline.findMany();
  console.dir(allPipelines, { depth: null });
  return allPipelines;
}

async function seedPipelineEnvVarsData(pipelineId: string) {
  const envVarSeedDataWithPipelineId = envVarPipelineSeedData.map(
    (envVarData) => ({
      ...envVarData,
      resourceId: pipelineId,
    }),
  );

  await Promise.all(
    envVarSeedDataWithPipelineId.map((envVarData) =>
      prisma.environmentVariable.create({
        data: envVarData,
      }),
    ),
  );
}

async function seedServicesEnvVarsData(serviceId: string) {
  const envVarSeedDataWithServiceId = envVarServiceSeedData.map(
    (envVarData) => ({
      ...envVarData,
      resourceId: serviceId,
    }),
  );

  await Promise.all(
    envVarSeedDataWithServiceId.map((envVarData) =>
      prisma.environmentVariable.create({
        data: envVarData,
      }),
    ),
  );
}

// Reset, then seed
(async function () {
  await deleteAllData(prisma);
  try {
    const seededPipelines = await seedPipelinesData();
    const pipelineId = seededPipelines[0].id;
    const allServices = await prisma.service.findMany();
    const serviceId = allServices[0].id;

    // Seed env vars for first pipeline only
    await seedPipelineEnvVarsData(pipelineId);
    await seedServicesEnvVarsData(serviceId);

    const allEnvVars = await prisma.environmentVariable.findMany();
    console.dir(allEnvVars, { depth: null });

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
