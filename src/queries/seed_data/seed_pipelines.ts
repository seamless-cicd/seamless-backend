import { Status, TriggerType, StageType } from '@prisma/client';

export const pipelineSeedQuery = [
  {
    name: 'Pipeline 01',
    githubPat: 'my_github_pat',
    awsAccessKey: 'my_aws_access_key',
    awsSecretAccessKey: 'my_aws_secret_access_key',
    services: {
      create: [
        {
          name: 'Service01',
          triggerOnCommit: true,
          triggerOnPrOpen: true,
          triggerOnPrSync: true,
          useStaging: false,
          githubRepository: 'my_github_repository',
          testCommand: 'npm run test',
          codeQualityCommand: 'npm run lint',
          dockerfilePath: './Dockerfile',
          runs: {
            create: [
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
                      containerId: 'container01',
                      log: {
                        create: {
                          url: 'https://example.com/log-prepare-01',
                          data: { message: 'Preparing' },
                        },
                      },
                    },
                    {
                      type: StageType.CODE_QUALITY,
                      startedAt: '2022-02-28T10:01:00.000Z',
                      status: Status.SUCCESS,
                      containerId: 'container02',
                      log: {
                        create: {
                          url: 'https://example.com/log-codequality-02',
                          data: { message: 'Linting' },
                        },
                      },
                    },
                    {
                      type: StageType.UNIT_TEST,
                      startedAt: '2022-02-28T10:02:00.000Z',
                      status: Status.FAILURE,
                      containerId: 'container03',
                      log: {
                        create: {
                          url: 'https://example.com/log-unittest-03',
                          data: { message: 'Performing unit tests' },
                        },
                      },
                    },
                  ],
                },
              },
              {
                startedAt: '2022-02-28T11:00:00.000Z',
                commitHash: 'abc234',
                commitMessage: 'My commit message',
                committer: 'Jason Wang',
                triggerType: TriggerType.COMMIT,
                stages: {
                  create: [
                    {
                      type: StageType.PREPARE,
                      startedAt: '2022-02-28T11:00:00.000Z',
                      status: Status.SUCCESS,
                      containerId: 'container04',
                      log: {
                        create: {
                          url: 'https://example.com/log-prepare-04',
                          data: { message: 'Preparing' },
                        },
                      },
                    },
                    {
                      type: StageType.CODE_QUALITY,
                      startedAt: '2022-02-28T11:01:00.000Z',
                      status: Status.SUCCESS,
                      containerId: 'container05',
                      log: {
                        create: {
                          url: 'https://example.com/log-codequality-05',
                          data: { message: 'Linting' },
                        },
                      },
                    },
                    {
                      type: StageType.UNIT_TEST,
                      startedAt: '2022-02-28T11:02:00.000Z',
                      status: Status.SUCCESS,
                      containerId: 'container06',
                      log: {
                        create: {
                          url: 'https://example.com/log-unittest-06',
                          data: { message: 'Performing unit tests' },
                        },
                      },
                    },
                    {
                      type: StageType.BUILD,
                      startedAt: '2022-02-28T11:03:00.000Z',
                      status: Status.SUCCESS,
                      containerId: 'container07',
                      log: {
                        create: {
                          url: 'https://example.com/log-build-07',
                          data: { message: 'Building' },
                        },
                      },
                    },
                    {
                      type: StageType.DEPLOY_PROD,
                      startedAt: '2022-02-28T11:04:00.000Z',
                      status: Status.IN_PROGRESS,
                      containerId: 'container08',
                      log: {
                        create: {
                          url: 'https://example.com/log-build-08',
                          data: { message: 'Deploying to Prod' },
                        },
                      },
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
];
