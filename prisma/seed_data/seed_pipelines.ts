import dotenv from 'dotenv';
dotenv.config();

import { StageType, TriggerType } from '@prisma/client';
import prisma from '../../src/utils/prisma-client';

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_TOKEN,
} from '../../src/utils/config';

export const seedPipelines = async () => {
  await prisma.pipeline.create({
    data: {
      id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
      name: 'Demo Pipeline',
      githubClientId: GITHUB_CLIENT_ID,
      githubClientSecret: GITHUB_CLIENT_SECRET,
      githubOauthToken: GITHUB_OAUTH_TOKEN,
      services: {
        create: [
          {
            id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e2',
            name: 'Demo Service',
            triggerOnMain: true,
            triggerOnPrOpen: false,
            triggerOnPrSync: false,
            useStaging: false,
            autoDeploy: false,
            githubRepoUrl:
              'https://github.com/seamless-cicd/seamless-demo-prod-notification',
            unitTestCommand: 'npm run test',
            codeQualityCommand: 'npm run lint',
            dockerfilePath: '.',
            runs: {
              create: [
                {
                  id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e3',
                  githubRepoBranch: 'main',
                  commitHash: 'abc123',
                  commitMessage: 'feat: add notification feature',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.MAIN,
                  stages: {
                    create: [
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e4',
                        type: StageType.PREPARE,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e5',
                        type: StageType.CODE_QUALITY,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e6',
                        type: StageType.UNIT_TEST,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e7',
                        type: StageType.BUILD,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e8',
                        type: StageType.DEPLOY_STAGING,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e9',
                        type: StageType.DEPLOY_PROD,
                        startedAt: new Date(),
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
