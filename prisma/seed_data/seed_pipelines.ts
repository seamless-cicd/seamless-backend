import { Status, TriggerType, StageType } from '@prisma/client';
import prisma from '../../src/services/prismaClient';

export const seedPipelines = async () => {
  await prisma.pipeline.create({
    data: {
      name: 'Pipeline 01',
      githubPat: 'my_github_pat',
      awsAccessKey: 'my_aws_access_key',
      awsSecretAccessKey: 'my_aws_secret_access_key',
      services: {
        create: [
          {
            name: 'Service01',
            triggerOnMain: true,
            triggerOnPrOpen: true,
            triggerOnPrSync: true,
            useStaging: false,
            githubRepoUrl: 'my_github_repository',
            unitTestCommand: 'npm run test',
            codeQualityCommand: 'npm run lint',
            dockerfilePath: './Dockerfile',
            runs: {
              create: [
                // Most stages idle
                {
                  startedAt: '2022-02-28T11:00:00.000Z',
                  commitHash: 'abc234',
                  commitMessage: 'My commit message',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.MAIN,
                  stages: {
                    create: [
                      {
                        type: StageType.PREPARE,
                        startedAt: '2022-02-28T11:00:00.000Z',
                        status: Status.IN_PROGRESS,
                      },
                      {
                        type: StageType.CODE_QUALITY,
                        startedAt: '2022-02-28T11:01:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        type: StageType.UNIT_TEST,
                        startedAt: '2022-02-28T11:02:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        type: StageType.BUILD,
                        startedAt: '2022-02-28T11:03:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        type: StageType.DEPLOY_PROD,
                        startedAt: '2022-02-28T11:04:00.000Z',
                        status: Status.IDLE,
                      },
                    ],
                  },
                },
                // Failure
                {
                  startedAt: '2022-02-28T10:00:00.000Z',
                  commitHash: 'abc123',
                  commitMessage: 'My commit message',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.PR_OPEN,
                  stages: {
                    create: [
                      {
                        type: StageType.PREPARE,
                        startedAt: '2022-02-28T10:00:00.000Z',
                        status: Status.SUCCESS,
                      },
                      {
                        type: StageType.CODE_QUALITY,
                        startedAt: '2022-02-28T10:01:00.000Z',
                        status: Status.SUCCESS,
                      },
                      {
                        type: StageType.UNIT_TEST,
                        startedAt: '2022-02-28T10:02:00.000Z',
                        status: Status.FAILURE,
                      },
                      {
                        type: StageType.BUILD,
                        startedAt: '2022-02-28T10:00:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        type: StageType.DEPLOY_PROD,
                        startedAt: '2022-02-28T10:00:00.000Z',
                        status: Status.IDLE,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const allPipelines = await prisma.pipeline.findMany();
  return allPipelines;
};
