import { ResourceType } from '@prisma/client';
import prisma from '../../src/clients/prisma-client';

export const seedPipelineEnvironmentVariables = async (pipelineId: string) => {
  await prisma.environmentVariable.createMany({
    data: [
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsRegion',
        value: 'us-east-1',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsAvailabilityZone',
        value: 'us-east-1a',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsAccountId',
        value: '12345789012',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsEcsCluster',
        value: 'my_ecs_cluster',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsStepFunction',
        value: 'my_stepfunction',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsRds',
        value: 'my_rds_connection_string',
      },
      {
        resourceType: ResourceType.PIPELINE,
        name: 'awsElastiCache',
        value: 'my_elasticache_endpoint',
      },
    ].map((envVarData) => ({
      ...envVarData,
      resourceId: pipelineId,
    })),
  });
  const allEnvVars = await prisma.environmentVariable.findMany();
  return allEnvVars;
};

export const seedServiceEnvironmentVariables = async (serviceId: string) => {
  await prisma.environmentVariable.createMany({
    data: [
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsService',
        value: 'my_ecs_service',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcsTaskDefinition',
        value: 'my_task_definition',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsEcrRepository',
        value: 'my_ecr_repository',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'awsSnsTopic',
        value: 'my_sns_topic',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'logSubscriberUrl',
        value: 'my_logging_service_url',
      },
      {
        resourceType: ResourceType.SERVICE,
        name: 'dockerBaseImage',
        value: 'node',
      },
    ].map((envVarData) => ({
      ...envVarData,
      resourceId: serviceId,
    })),
  });
  const allEnvVars = await prisma.environmentVariable.findMany();
  return allEnvVars;
};
