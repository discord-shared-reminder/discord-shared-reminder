/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib'

import { InfraStack } from './stacks/infra-stack'
import { ComputeStack } from './stacks/compute-stack'

class ServiceApp extends cdk.App {
  constructor() {
    super()

    const infraStack = new InfraStack(this)
    const computeStack = new ComputeStack(this)
  }
}

new ServiceApp()
