import { SSTConfig } from 'sst';
import { ApiStack, DynamoStack, SiteStack } from 'src/stacks';

export const SstConfig: SSTConfig = {
  config(input) {
    return {
      name: 'shortly',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(DynamoStack).stack(ApiStack).stack(SiteStack);

    app.setDefaultRemovalPolicy(app.mode === 'dev' ? 'destroy' : 'retain');
    app.setDefaultFunctionProps({
      tracing: 'disabled',
      runtime: 'nodejs16.x',
      architecture: 'arm_64',
      memorySize: '128 MB',
      timeout: '10 seconds'
    });
  }
}
