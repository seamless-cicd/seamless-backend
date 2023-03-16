import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';

import { WEBSOCKETS_API_URL } from '../utils/config';

export const postDataToConnections = async (connectionIds: string[]) => {
  const client = new ApiGatewayManagementApiClient({
    endpoint: WEBSOCKETS_API_URL,
    region: 'us-east-1',
  });

  const string = 'Hello World!';
  const data = Uint8Array.from(string.split('').map((x) => x.charCodeAt(0)));

  const postToConnectionCalls = connectionIds.map(async (connectionId) => {
    try {
      const requestParams = {
        ConnectionId: connectionId,
        Data: data,
      };
      const command = new PostToConnectionCommand(requestParams);
      await client.send(command);
    } catch (e) {
      // @ts-ignore
      if (e && e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        deleteConnection(connectionIds, connectionId);
      } else {
        throw e;
      }
    }
  });

  await Promise.all(postToConnectionCalls);
};

export const deleteConnection = (
  connectionIds: string[],
  connectionId: string,
) => {
  const index = connectionIds.indexOf(connectionId);
  connectionIds.splice(index, 1);
};
