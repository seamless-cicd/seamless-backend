import { SfnInputSchema, SfnInput } from '../clients/sfn-input-schema';
import { StartExecutionCommand } from '@aws-sdk/client-sfn';
import { createSfnClient } from '../clients/sfn-client';

// Gather the entity IDs, initial statuses, and environment variables required by the Step Function
async function gatherInput(): Promise<SfnInput> {
  // Query RDS
  const sfnInput = {};

  // Format data

  // Validate data shape
  if (!SfnInputSchema.safeParse(sfnInput).success) {
    throw new Error('Invalid input data');
  }

  return sfnInput;
}

async function start(stateMachineArn: string) {
  try {
    const sfnInput = await gatherInput();

    const { awsRegion, awsAccessKey, awsSecretAccessKey } =
      sfnInput.containerVariables;
    const sfnClient = createSfnClient(
      awsRegion,
      awsAccessKey,
      awsSecretAccessKey,
    );

    const sfnCommand = new StartExecutionCommand({
      stateMachineArn,
      input: JSON.stringify(sfnInput),
    });

    const response = await sfnClient.send(sfnCommand);

    // Update RDS
    // Notify user of state machine start
  } catch (error) {
    console.error('Failed to start Step Function. Check input data.');
  }
}

export { start };
