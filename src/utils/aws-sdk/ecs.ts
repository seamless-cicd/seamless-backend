import {
  DescribeServicesCommand,
  DescribeTaskDefinitionCommand,
  ECSClient,
  RegisterTaskDefinitionCommand,
  RegisterTaskDefinitionCommandInput,
  TaskDefinition,
  UpdateServiceCommand,
} from '@aws-sdk/client-ecs';

// All possible properties of RegisterTaskDefinitionCommandInput
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

const createEcsClient = (awsRegion: string) =>
  new ECSClient({ region: awsRegion });

const findService = async (
  ecsClient: ECSClient,
  serviceName: string,
  clusterName: string,
) => {
  const { services } = await ecsClient.send(
    new DescribeServicesCommand({
      services: [serviceName],
      cluster: clusterName,
    }),
  );
  if (!services || services.length === 0) {
    throw new Error(
      `ECS Service ${serviceName} was not found in Cluster ${clusterName}`,
    );
  }

  return services[0];
};

const findTaskDefinitionForService = async (
  ecsClient: ECSClient,
  serviceName: string,
  clusterName: string,
) => {
  const service = await findService(ecsClient, serviceName, clusterName);

  const currentTaskDefinitionArn = service.taskDefinition;

  const { taskDefinition: currentTaskDefinition } = await ecsClient.send(
    new DescribeTaskDefinitionCommand({
      taskDefinition: currentTaskDefinitionArn,
    }),
  );
  if (!currentTaskDefinition) {
    throw new Error(
      `No Task Definition found for ARN ${currentTaskDefinitionArn}`,
    );
  }

  return currentTaskDefinition;
};

// Create a new Task Definition, preserving as much as possible from the current one
const updateTaskDefinitionWithNewImageTag = (
  taskDefinition: TaskDefinition,
  newTag: string,
) => {
  const newTaskDefinition = Object.fromEntries(
    Object.entries(taskDefinition).filter((entry) =>
      taskDefinitionProperties.includes(entry[0]),
    ),
  );

  // Assume the Task Definition only has 1 container
  const currentImage = newTaskDefinition.containerDefinitions[0].image;
  const newImage = `${currentImage?.split(':')[0]}:${newTag}`;
  newTaskDefinition.containerDefinitions[0].image = newImage;

  return newTaskDefinition;
};

// Register new Task Definition on ECR
const registerTaskDefinition = async (
  ecsClient: ECSClient,
  taskDefinition: TaskDefinition,
) => {
  const { taskDefinition: registeredTaskDefinition } = await ecsClient.send(
    new RegisterTaskDefinitionCommand(
      taskDefinition as RegisterTaskDefinitionCommandInput,
    ),
  );

  if (!registeredTaskDefinition) {
    throw new Error('Failed to register new Task Definition');
  }

  return registeredTaskDefinition;
};

// Update the ECS Service using the newly-registered Task Definition's ARN
const updateServiceWithNewTaskDefinition = async (
  ecsClient: ECSClient,
  serviceName: string,
  clusterName: string,
  taskDefinition: TaskDefinition,
) => {
  const response = await ecsClient.send(
    new UpdateServiceCommand({
      service: serviceName,
      cluster: clusterName,
      taskDefinition: taskDefinition.taskDefinitionArn,
      forceNewDeployment: true,
    }),
  );

  return response;
};

export {
  createEcsClient,
  findService,
  findTaskDefinitionForService,
  updateTaskDefinitionWithNewImageTag,
  registerTaskDefinition,
  updateServiceWithNewTaskDefinition,
};
