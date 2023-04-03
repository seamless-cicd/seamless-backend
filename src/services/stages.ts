import { StageType } from '@prisma/client';
import prisma from '../utils/prisma-client';

// Get all Stages for a Run
// They will be ordered on the Frontend
async function getAllForRun(runId: string) {
  try {
    const stages = await prisma.stage.findMany({
      where: {
        runId: runId,
      },
    });
    await prisma.$disconnect();
    return stages;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Delete a Stage
async function deleteOne(id: string) {
  try {
    const deletedStage = await prisma.stage.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return deletedStage;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

// Create all placeholder Stages for a Run
async function createAll(runId: string) {
  try {
    await Promise.all(
      Object.values(StageType)
        .filter((stage) => stage !== StageType.OTHER)
        .map((type) => {
          return prisma.stage.create({
            data: {
              startedAt: new Date(),
              type,
              runId,
            },
          });
        }),
    );
    await prisma.$disconnect();
  } catch (e) {
    console.log(e);
    await prisma.$disconnect();
  }
}

// Update a Stage
async function updateOne(id: string, data: any) {
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

// Update

export default {
  getAllForRun,
  createAll,
  deleteOne,
  updateOne,
};
