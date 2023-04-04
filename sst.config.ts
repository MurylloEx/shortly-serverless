import { SSTConfig } from 'sst';
import { MyStack } from './stacks/MyStack';

export default {
  config(input) {
    return {
      name: 'learning-sst-framework',
      region: 'us-east-1'
    };
  },
  stacks(app) {
    app.stack(MyStack);
  }
} satisfies SSTConfig;
