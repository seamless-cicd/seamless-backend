import { DescribeImagesCommand, ECRClient } from '@aws-sdk/client-ecr';
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

// Clients
const createEcsClient = (awsRegion: string) =>
  new ECSClient({ region: awsRegion });

const createEcrClient = (awsRegion: string) =>
  new ECRClient({ region: awsRegion });

// ECR operations
// Check if tagged image (e.g. "my-image:1.0") exists in the specified ECR repository
const checkIfImageExists = async (
  awsRegion: string,
  awsEcrRepository: string,
  imageNameWithTag: string,
) => {
  const ecrClient = createEcrClient(awsRegion);

  const params = {
    repositoryName: awsEcrRepository,
    imageIds: [
      {
        imageTag: imageNameWithTag,
      },
    ],
  };

  const command = new DescribeImagesCommand(params);
  const { imageDetails } = await ecrClient.send(command);

  if (!imageDetails || imageDetails.length === 0) {
    console.log(
      `Image ${imageNameWithTag} does not exist in repository ${awsEcrRepository}.`,
    );
    return true;
  } else {
    console.log(
      `Image ${imageNameWithTag} exists in repository ${awsEcrRepository}.`,
    );
    return false;
  }
};

// ECS operations
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
  awsRegion: string,
  awsEcrRepository: string,
  taskDefinition: TaskDefinition,
  newTag: string,
) => {
  const newTaskDefinition = Object.fromEntries(
    Object.entries(taskDefinition).filter((entry) =>
      taskDefinitionProperties.includes(entry[0]),
    ),
  );

  // Assume the Task Definition only has 1 container, so select the first one
  const currentImage = newTaskDefinition.containerDefinitions[0].image;
  const newImage = `${currentImage?.split(':')[0]}:${newTag}`;
  newTaskDefinition.containerDefinitions[0].image = newImage;

  // Check if specified image exists in ECR
  if (!checkIfImageExists(awsRegion, awsEcrRepository, newImage)) {
    throw new Error(
      `Image ${newImage} does not exist in repository ${awsEcrRepository}.`,
    );
  }

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

export default {
  createEcsClient,
  findService,
  findTaskDefinitionForService,
  updateTaskDefinitionWithNewImageTag,
  registerTaskDefinition,
  updateServiceWithNewTaskDefinition,
};
