import { sendTaskToken } from '../services/step-functions';

type TokenHolder = {
  [runId: string]: string;
};

class DeploymentApprovalManager {
  taskTokens: TokenHolder;

  constructor() {
    this.taskTokens = {};
  }

  setTaskToken(runId: string, token: string) {
    this.taskTokens[runId] = token;
  }

  removeTaskToken(runId: string) {
    delete this.taskTokens[runId];
  }

  approve(runId: string) {
    if (!this.taskTokens[runId]) {
      throw new Error(`No task token exists for run id ${runId}`);
    }

    sendTaskToken(this.taskTokens[runId]);
    this.removeTaskToken(runId);
  }
}

export const deploymentApprovalManager = new DeploymentApprovalManager();
