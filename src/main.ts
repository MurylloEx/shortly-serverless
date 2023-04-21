import { SSTConfig } from 'sst';
import { ApiStack, DynamoStack } from 'src/stacks';

export const SstConfig: SSTConfig = {
  config(input) {
    return {
      name: 'shortly',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs16.x',
      architecture: 'arm_64',
      memorySize: '128 MB'
    });

    app.stack(DynamoStack).stack(ApiStack);
  }
}
