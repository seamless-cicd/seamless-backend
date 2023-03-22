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
      id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e0',
      name: 'Demo Pipeline',
      awsEcsCluster: 'SeamlessProdCluster',
      awsEcsClusterStaging: 'SeamlessStagingCluster',
      githubClientId: GITHUB_CLIENT_ID,
      githubClientSecret: GITHUB_CLIENT_SECRET,
      githubOauthToken: GITHUB_OAUTH_TOKEN,
      services: {
        create: [
          {
            id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e1',
            name: 'Demo Service',
            awsEcsService: 'SeamlessProdPaymentService',
            awsEcsServiceStaging: 'SeamlessStagingPaymentService',
            triggerOnMain: true,
            triggerOnPrOpen: true,
            triggerOnPrSync: true,
            useStaging: true,
            autoDeploy: false,
            githubRepoUrl:
              'https://github.com/seamless-cicd/seamless-demo-payment',
            unitTestCommand: 'npm run test',
            codeQualityCommand: 'npm run lint',
            dockerfilePath: '.',
            githubIntegrationTestRepoUrl:
              'https://github.com/seamless-cicd/seamless-demo-payment-integration-test',
            dockerComposeFilePath: '.',
            dockerComposeServiceName: 'payment',
            dockerComposeIntegrationTestServiceName: 'integration-test',
            runs: {
              create: [
                {
                  id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e2',
                  commitHash: 'f6d6abe94d5bc3010666635c67bc43213aff85bd',
                  commitMessage: 'feat: add payment feature',
                  committer: 'Jason Wang',
                  triggerType: TriggerType.MAIN,
                  stages: {
                    create: [
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e3',
                        type: StageType.PREPARE,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e4',
                        type: StageType.CODE_QUALITY,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e5',
                        type: StageType.UNIT_TEST,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e6',
                        type: StageType.BUILD,
                        startedAt: new Date(),
                      },
                      {
                        id: 'd8583d1c-ce63-4e0c-bd55-2088409bc7e7',
                        type: StageType.INTEGRATION_TEST,
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
};
