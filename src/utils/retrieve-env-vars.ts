import {
  ApiGatewayV2Client,
  GetApisCommand,
} from '@aws-sdk/client-apigatewayv2';
import { ListStateMachinesCommand, SFNClient } from '@aws-sdk/client-sfn';
import { AWS_REGION } from '../utils/config';

// logicalId is "SeamlessHttpApi" or "SeamlessWebsocketsApi"
export const getApiGatewayUrl = async (logicalId: string) => {
  const apiGatewayClient = new ApiGatewayV2Client({
    region: AWS_REGION,
  });

  try {
    const apis = await apiGatewayClient.send(new GetApisCommand({}));
    if (!apis.Items || apis.Items.length === 0)
      throw new Error('no api gateways found');

    const httpApis = apis.Items.filter((api) => {
      if (!api.Tags) return false;
      return api.Tags['aws:cloudformation:logical-id'] === logicalId;
    });
    if (httpApis.length === 0) throw new Error('no api gateways found');

    let url = httpApis[0].ApiEndpoint;
    // Convert WebSocket URL to Connection URL
    if (url?.startsWith('wss')) url = `https${url.slice(3)}/production`;

    return url;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const getStepFunctionArn = async () => {
  const sfnClient = new SFNClient({
    region: AWS_REGION,
  });

  // Retrieve Step Function ARN
  const { stateMachines } = await sfnClient.send(
    new ListStateMachinesCommand({}),
  );
  if (!stateMachines || stateMachines.length === 0) {
    throw new Error('failed to get step function arn');
  }

  const stateMachineArn = stateMachines
    .filter((stateMachine) =>
      /^SeamlessStateMachine/.test(stateMachine.name || ''),
    )
    .map((stateMachine) => stateMachine.stateMachineArn)[0];

  return stateMachineArn;
};

export const setEnvVars = async () => {
  process.env.BACKEND_URL = (await getApiGatewayUrl('SeamlessHttpApi')) || '';
  process.env.WEBSOCKET_API_URL =
    (await getApiGatewayUrl('SeamlessWebsocketsApi')) || '';
  process.env.STATE_MACHINE_ARN = await getStepFunctionArn();
};

setEnvVars();
