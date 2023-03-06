import prisma from './prismaClient';
import { StageType } from '@prisma/client';

async function getAllForRun(runId: any) {
  try {
    const allStages = await prisma.stage.findMany({
      where: {
        runId: runId
      }
    });
    await prisma.$disconnect();
    return allStages;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function deleteOne(id: any) {
  try {
    const deleted = await prisma.stage.delete({
      where: {
        id: id
      }
    });
    await prisma.$disconnect();
    return deleted;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function createAll(runId: any) {
  try {
    await Promise.all([
      createPrepare(runId),
      createCodeQuality(runId),
      createUnitTest(runId),
      createIntegrationTest(runId),
      createBuild(runId),
      createDeployStaging(runId),
      createDeployProd(runId),
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function createPrepare(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.PREPARE,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createCodeQuality(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.CODE_QUALITY,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createUnitTest(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.UNIT_TEST,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createIntegrationTest(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.INTEGRATION_TEST,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createBuild(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.BUILD,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createDeployStaging(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.DEPLOY_STAGING,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

async function createDeployProd(runId: any) {  
  try {
    const stage = await prisma.stage.create({
      data: {
        startedAt: new Date(),
        type: StageType.DEPLOY_PROD,
        runId: runId,
      }
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }  
}

export default { getAllForRun, createAll, deleteOne };