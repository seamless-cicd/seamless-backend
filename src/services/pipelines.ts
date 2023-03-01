import prisma from './prismaClient';

async function getAll() {
  try {
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
    await prisma.$disconnect();
    return allPipelines;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAll };