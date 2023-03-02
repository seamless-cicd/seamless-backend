import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allPipelines = await prisma.pipeline.findMany({
    include: {
      services: {
        include: {
          runs: {
            include: {
              stages: {
                include: {
                  log: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.dir(allPipelines, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
