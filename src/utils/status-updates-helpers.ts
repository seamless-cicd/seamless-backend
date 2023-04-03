import { RunStatus } from '../schemas/step-function-schema';
import runsService from '../services/runs';
import stagesService from '../services/stages';
import prisma from './prisma-client';

const updateRun = async (runStatus: RunStatus) => {
  const { run } = runStatus;

  await runsService.updateOne(run.id, { status: run.status });

  if (run.status === 'SUCCESS' || run.status === 'FAILURE') {
    await runsService.updateOne(run.id, { endedAt: new Date() });
  }
};

const updateStages = async (runStatus: RunStatus) => {
  const { stages } = runStatus;

  const stageUpdates = Object.values(stages);

  await Promise.all(
    stageUpdates.map(async (stageUpdate, index) => {
      // Update status
      stagesService.updateOne(stageUpdate.id, { status: stageUpdate.status });

      // If the first stage started, just update its start time
      if (stageUpdate.status === 'IN_PROGRESS' && index === 0) {
        stagesService.updateOne(stageUpdate.id, {
          startedAt: new Date(),
        });
        // If any other stage just started, also update the end time & duration of previous stage
      } else if (stageUpdate.status === 'IN_PROGRESS') {
        const previousStageUpdate = stageUpdates[index - 1];

        const previousStage = await prisma.stage.findUnique({
          where: {
            id: previousStageUpdate.id,
          },
        });

        if (!previousStage) {
          throw new Error('previous stage does not exist');
        }

        if (!previousStage.startedAt) {
          throw new Error('previous stage not initialized with a start time');
        }

        const currentDate = new Date();

        const duration = Math.ceil(
          (currentDate.getTime() - previousStage.startedAt.getTime()) / 1000,
        );

        // Set the end time of the previous stage
        stagesService.updateOne(previousStageUpdate.id, {
          endedAt: currentDate,
          duration,
        });

        // Set the start time of the new stage
        stagesService.updateOne(stageUpdate.id, {
          startedAt: currentDate,
        });
      }
    }),
  );
};

export { updateRun, updateStages };
