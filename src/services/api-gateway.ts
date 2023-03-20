import {
  ApiGatewayV2Client,
  GetApisCommand,
} from '@aws-sdk/client-apigatewayv2';
import { AWS_REGION } from '../utils/config';

// logicalId is "SeamlessHttpApi" or "SeamlessWebsocketsApi"
const getApiGatewayUrl = async (logicalId: string) => {
  try {
    const apiGatewayClient = new ApiGatewayV2Client({
      region: AWS_REGION,
    });

    const apis = await apiGatewayClient.send(new GetApisCommand({}));
    if (!apis.Items || apis.Items.length === 0)
      throw new Error('no api gateways found');

    const filteredApis = apis.Items.filter((api) => {
      if (!api.Tags) return false;
      return api.Tags['aws:cloudformation:logical-id'] === logicalId;
    });
    if (filteredApis.length === 0)
      throw new Error('no matching api gateways found');

    let url = filteredApis[0].ApiEndpoint;
    // Add "production" stage to WebSocket URL
    if (url?.startsWith('wss')) url = `${url}/production`;
    return url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default { getApiGatewayUrl };
