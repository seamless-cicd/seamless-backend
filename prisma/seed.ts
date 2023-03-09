import { PrismaClient } from '@prisma/client';
import {
  seedPipelineEnvironmentVariables,
  seedServiceEnvironmentVariables,
} from './seed_data/seed_envvars';
import { deleteAllData } from './seed_data/delete_all_data';
import { queryTimer } from './seed_data/query_timer';
import { seedPipelines } from './seed_data/seed_pipelines';

const prisma = new PrismaClient();
prisma.$use(queryTimer);

// Cannot use createMany with nested writes
// https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-multiple-records-and-multiple-related-records

// Reset, then seed
(async function () {
  await deleteAllData(prisma);
  try {
    const seededPipelines = await seedPipelines();
    const pipelineId = seededPipelines[0].id;
    const allServices = await prisma.service.findMany();
    const serviceId = allServices[0].id;

    // Seed env vars for first pipeline only
    await seedPipelineEnvironmentVariables(pipelineId);
    await seedServiceEnvironmentVariables(serviceId);

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
