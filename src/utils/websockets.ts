/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';

import { WEBSOCKETS_API_URL } from '../utils/config';

type WebSocketsData = {
  type: string;
  data: object;
};

// Set this config with app.set
class WebSocketsConnectionManager {
  readonly connectionIds: string[];

  constructor() {
    this.connectionIds = [];
  }

  addConnection(connectionId: string) {
    this.connectionIds.push(connectionId);
  }

  deleteConnection(connectionId: string) {
    const index = this.connectionIds.indexOf(connectionId);
    this.connectionIds.splice(index, 1);
  }

  async postDataToConnections(data: WebSocketsData) {
    const client = new ApiGatewayManagementApiClient({
      endpoint: WEBSOCKETS_API_URL,
      region: 'us-east-1',
    });

    const dataString = JSON.stringify(data);
    const dataUint8Array = Uint8Array.from(
      dataString.split('').map((x) => x.charCodeAt(0)),
    );

    const postToConnectionCalls = this.connectionIds.map(
      async (connectionId) => {
        try {
          const requestParams = {
            ConnectionId: connectionId,
            Data: dataUint8Array,
          };
          const command = new PostToConnectionCommand(requestParams);
          await client.send(command);
        } catch (e) {
          // @ts-ignore
          if (e && e.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            this.deleteConnection(connectionId);
          } else {
            throw e;
          }
        }
      },
    );

    await Promise.all(postToConnectionCalls);
  }
}

export const webSocketsConnectionManager = new WebSocketsConnectionManager();
