import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async function () {
  try {
    const run = await prisma.run.findUnique({
      where: { id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e3' },
      include: {
        stages: true,
        Service: {
          include: {
            Pipeline: true,
          },
        },
      },
    });

    const pipeline = run?.Service?.Pipeline;
    const service = run?.Service
      ? { ...run.Service, Pipeline: undefined }
      : undefined;
    const stages = run?.stages;
    const restRun = { ...run, Service: undefined, stages: undefined };
    console.log(pipeline);
    console.log(service);
    console.log(run);
    console.log(stages);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
