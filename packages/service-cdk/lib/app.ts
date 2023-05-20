/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib'

import { InfraStack } from './stacks/infra-stack';

class ServiceApp extends cdk.App {
  
  constructor () {
    super();

    new InfraStack(this);
  }
}


new ServiceApp()