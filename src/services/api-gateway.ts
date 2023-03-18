import {
  ApiGatewayV2Client,
  GetApisCommand,
} from '@aws-sdk/client-apigatewayv2';
import pipelinesService from './pipelines';

// logicalId is "SeamlessHttpApi" or "SeamlessWebsocketsApi"
const getApiGatewayUrl = async (logicalId: string) => {
  const pipeline = await pipelinesService.getFirst();
  const apiGatewayClient = new ApiGatewayV2Client({
    region: pipeline?.awsRegion,
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
    return null;
  }
};

export default { getApiGatewayUrl };
