import prisma from '../clients/prisma-client';
import { ResourceType, EnvironmentVariable, Service } from '@prisma/client';
import envVarsService from './envVars';

export interface ServiceWithEnvVars extends Service {
  awsEcsService?: string;
  awsEcsTaskDefinition?: string;
  awsEcrRepository?: string;
  awsEcrSnsTopic?: string;
  logSubscriberUrl?: string;
  dockerBaseImage?: string;
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

export default { getAll, getOne, createOne, deleteOne, updateOne };
