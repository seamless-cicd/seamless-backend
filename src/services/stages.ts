import prisma from '../clients/prisma-client';
import { StageType } from '@prisma/client';

async function getAllForRun(runId: any) {
  try {
    const allStages = await prisma.stage.findMany({
      where: {
        runId: runId,
      },
      orderBy: {
        createdAt: 'asc',
      },
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
        id: id,
      },
    });
    await prisma.$disconnect();
    return deleted;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// This replaced a promise.all - this below will create stages in order, this is important so they get a createdAt in the order of the stages, stages will then be displayed based off of this timestamp/order
async function createAll(runId: any) {
  try {
    await createPrepare(runId);
    await createCodeQuality(runId);
    await createUnitTest(runId);
    await createIntegrationTest(runId);
    await createBuild(runId);
    await createDeployStaging(runId);
    await createDeployProd(runId);
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
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
      },
    });
    await prisma.$disconnect();
    return stage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// needed to test status updates for polling, with postman can update status
// then can see if the front end polls and displays new data
async function updateOne(id: any, data: any) {
  try {
    const updated = await prisma.stage.update({
      where: {
        id: id,
      },
      data: data,
    });
    await prisma.$disconnect();
    return updated;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

export default { getAllForRun, createAll, deleteOne, updateOne };

