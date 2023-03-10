import { Status, TriggerType, StageType } from '@prisma/client';
import prisma from '../../src/clients/prisma-client';

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
            dockerfilePath: '.',
            runs: {
              create: [
                // Most stages idle
                {
                  id: 'runId',
                  startedAt: '2022-02-28T11:00:00.000Z',
                  commitHash: 'abc234',
                  commitMessage: 'My commit message',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.MAIN,
                  stages: {
                    create: [
                      {
                        id: 'prepareId',
                        type: StageType.PREPARE,
                        startedAt: '2022-02-28T11:00:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'codeQualityId',
                        type: StageType.CODE_QUALITY,
                        startedAt: '2022-02-28T11:01:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'unitTestId',
                        type: StageType.UNIT_TEST,
                        startedAt: '2022-02-28T11:02:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'buildId',
                        type: StageType.BUILD,
                        startedAt: '2022-02-28T11:03:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'deployStagingId',
                        type: StageType.DEPLOY_STAGING,
                        startedAt: '2022-02-28T11:04:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'deployProdId',
                        type: StageType.DEPLOY_PROD,
                        startedAt: '2022-02-28T11:04:00.000Z',
                        status: Status.IDLE,
                      },
                    ],
                  },
                },
                // Failure
                {
                  id: 'runId2',
                  startedAt: '2022-02-28T10:00:00.000Z',
                  commitHash: 'abc123',
                  commitMessage: 'My commit message',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.PR_OPEN,
                  stages: {
                    create: [
                      {
                        id: 'prepareId2',
                        type: StageType.PREPARE,
                        startedAt: '2022-02-28T11:00:00.000Z',
                        status: Status.SUCCESS,
                      },
                      {
                        id: 'codeQualityId2',
                        type: StageType.CODE_QUALITY,
                        startedAt: '2022-02-28T11:01:00.000Z',
                        status: Status.SUCCESS,
                      },
                      {
                        id: 'unitTestId2',
                        type: StageType.UNIT_TEST,
                        startedAt: '2022-02-28T11:02:00.000Z',
                        status: Status.FAILURE,
                      },
                      {
                        id: 'buildId2',
                        type: StageType.BUILD,
                        startedAt: '2022-02-28T11:03:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'deployStagingId2',
                        type: StageType.DEPLOY_STAGING,
                        startedAt: '2022-02-28T11:04:00.000Z',
                        status: Status.IDLE,
                      },
                      {
                        id: 'deployProdId2',
                        type: StageType.DEPLOY_PROD,
                        startedAt: '2022-02-28T11:04:00.000Z',
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
