import {
  ApiGatewayManagementApiClient,
  GoneException,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { LogData } from '../schemas/log-schema';
import { RunStatus } from '../schemas/step-function-schema';
import { AWS_REGION, WEBSOCKETS_API_URL } from './config';

type WebSocketsData = {
  type: string;
  data: RunStatus | LogData[] | object;
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
      region: AWS_REGION,
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
          // Status code 410 Gone: Resource is permanently gone
          if (e instanceof GoneException) {
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
