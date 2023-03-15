import {
  DescribeServicesCommand,
  DescribeTaskDefinitionCommand,
  ECSClient,
  RegisterTaskDefinitionCommand,
  RegisterTaskDefinitionCommandInput,
  UpdateServiceCommand,
} from '@aws-sdk/client-ecs';
import { EnvironmentVariable, ResourceType, Service } from '@prisma/client';
import prisma from '../utils/prisma-client';
import envVarsService from './envVars';
import pipelinesService from './pipelines';

export interface ServiceWithEnvVars extends Service {
  awsEcsServiceStaging?: string;
  awsEcsService: string;
  awsEcsTaskDefinition?: string;
  awsEcrRepository?: string;
  awsEcrSnsTopic?: string;
  logSubscriberUrl?: string;
}

// gets all services - only top level data - assumes one pipeline
async function getAll() {
  try {
    const allServices = await prisma.service.findMany();

    // Retrieve env vars for all services
    const envVars = await envVarsService.getAll(ResourceType.SERVICE);
    // Group env vars by service id
    const groupedEnvVars = envVars?.reduce(
      (entryMap, e) =>
        entryMap.set(e.resourceId, [...(entryMap.get(e.resourceId) || []), e]),
      new Map(),
    );
    // Insert into the associated pipeline object inside allServices
    allServices.forEach((service) => {
      const envVarsForService: EnvironmentVariable[] = groupedEnvVars?.get(
        service.id,
      );
      const flattenedEnvVars: { [key: string]: string } = {};
      envVarsForService?.forEach((envVar) => {
        flattenedEnvVars[envVar.name] = envVar.value;
      });
      Object.assign(service, flattenedEnvVars);
    });

    await prisma.$disconnect();
    return allServices;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function getOne(serviceId: string) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    // Retrieve env vars for this service
    const envVars = await envVarsService.getOne(
      ResourceType.SERVICE,
      serviceId,
    );
    // Insert env vars into the pipeline object
    const flattenedEnvVars: { [key: string]: string } = {};
    envVars?.forEach((envVar) => {
      flattenedEnvVars[envVar.name] = envVar.value;
    });

    await prisma.$disconnect();
    return { ...service, ...flattenedEnvVars } as ServiceWithEnvVars;
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function createOne(serviceData: any) {
  const { awsEcrRepo, awsEcsService, ...serviceTableData } = serviceData;

  try {
    const service = await prisma.service.create({
      data: serviceTableData,
    });

    const envVarsCount = await prisma.environmentVariable.createMany({
      data: [
        {
          name: 'awsEcrRepo',
          value: awsEcrRepo,
          resourceId: service.id,
          resourceType: ResourceType.SERVICE,
        },
        {
          name: 'awsEcsService',
          value: awsEcsService,
          resourceId: service.id,
          resourceType: ResourceType.SERVICE,
        },
      ],
    });

    await prisma.$disconnect();
    return [service, envVarsCount];
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
  }
}

async function deleteOne(id: any) {
  try {
    const deleted = await prisma.service.delete({
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

async function updateOne(id: any, data: any) {
  try {
    const updated = await prisma.service.update({
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

async function rollback(id: string, commitHash: string) {
  try {
    const service = await getOne(id);
    if (!service || !service?.pipelineId)
      throw new Error('Failed to get Service');

    const pipeline = await pipelinesService.getOne(service.pipelineId);
    if (!pipeline) throw new Error('Failed to get Pipeline');

    const ecsClient = new ECSClient({ region: pipeline.awsRegion });

    // Retrieve data about the ECS Service
    const { services } = await ecsClient.send(
      new DescribeServicesCommand({
        services: [service.awsEcsService],
        cluster: pipeline.awsEcsCluster,
      }),
    );
    if (!services || services.length === 0) {
      throw new Error('No Services found');
    }

    // Extract data about the Service's Task Definition
    const currentTaskDefinitionArn = services[0].taskDefinition;

    const { taskDefinition: currentTaskDefinition } = await ecsClient.send(
      new DescribeTaskDefinitionCommand({
        taskDefinition: currentTaskDefinitionArn,
      }),
    );
    if (!currentTaskDefinition) {
      throw new Error('No Task Definition found');
    }

    // Create a new Task Definition, preserving as much as possible from the current one
    const taskDefinitionProperties = [
      'containerDefinitions',
      'cpu',
      'ephemeralStorage',
      'executionRoleArn',
      'family',
      'inferenceAccelerators',
      'ipcMode',
      'memory',
      'networkMode',
      'pidMode',
      'placementConstraints',
      'proxyConfiguration',
      'requiresCompatibilities',
      'runtimePlatform',
      'tags',
      'taskRoleArn',
      'volumes',
    ];

    const newTaskDefinition = Object.fromEntries(
      Object.entries(currentTaskDefinition).filter((entry) =>
        taskDefinitionProperties.includes(entry[0]),
      ),
    );

    // Assume only 1 container
    const currentImage = newTaskDefinition.containerDefinitions[0].image;
    const newImage = `${currentImage?.split(':')[0]}:${commitHash}`;
    newTaskDefinition.containerDefinitions[0].image = newImage;

    // Register new Task Definition on ECR
    const { taskDefinition: registeredTaskDefinition } = await ecsClient.send(
      new RegisterTaskDefinitionCommand(
        newTaskDefinition as RegisterTaskDefinitionCommandInput,
      ),
    );
    if (!registeredTaskDefinition) {
      throw new Error('Failed to register new Task Definition');
    }

    // Update the ECS Service using the newly-registered Task Definition's ARN
    const response = await ecsClient.send(
      new UpdateServiceCommand({
        service: service.awsEcsService,
        cluster: pipeline.awsEcsCluster,
        taskDefinition: registeredTaskDefinition.taskDefinitionArn,
        forceNewDeployment: true,
      }),
    );

    return response;
  } catch (e) {
    console.error(e);
  }
}

export default { getAll, getOne, createOne, deleteOne, updateOne, rollback };
