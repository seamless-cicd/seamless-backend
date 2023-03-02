import prisma from './prismaClient';
import { ResourceType } from '@prisma/client';

async function getAll(resourceType: ResourceType) {
  try {
    const envVars = await prisma.environmentVariable.findMany({
      where: {
        resourceType,
      },
    });
    await prisma.$disconnect();
    return envVars;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function getOne(resourceType: ResourceType, resourceId: string) {
  try {
    const envVars = await prisma.environmentVariable.findMany({
      where: {
        resourceType,
        resourceId,
      },
    });
    await prisma.$disconnect();
    return envVars;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAll, getOne };
