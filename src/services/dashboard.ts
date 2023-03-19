import prisma from '../utils/prisma-client';

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

async function getServicesWithRuns() {
  try {
    const servicesWithRuns = await prisma.service.findMany({
      include: {
        runs: {
          where: {
            createdAt: {
              gte: twoWeeksAgo
            }
          }
        }
      }
    });

    await prisma.$disconnect();
    return servicesWithRuns;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function getRunStatusCount() {
  try {
    const groupedRunsByStatus = await prisma.run.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: twoWeeksAgo,
        },
      },
      _count: {
        status: true,
      },
    });
  
    await prisma.$disconnect();
    return groupedRunsByStatus;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function getStageStatusCount() {
  try {
    const groupedRunsByStatus = await prisma.stage.groupBy({
      by: ['status'],
      where: {
        createdAt: {
          gte: twoWeeksAgo,
        },
      },
      _count: {
        status: true,
      },
    });
  
    await prisma.$disconnect();
    return groupedRunsByStatus;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default {
  getServicesWithRuns,
  getRunStatusCount,
  getStageStatusCount,
}