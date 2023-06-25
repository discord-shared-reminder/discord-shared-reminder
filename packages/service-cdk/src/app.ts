/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib'

import { SubscriptionFilter } from 'aws-cdk-lib/aws-sns'
import type { LambdaSubscriptionProps } from 'aws-cdk-lib/aws-sns-subscriptions'
import { InfraStack } from './stacks/infra-stack'
import { ComputeStack } from './stacks/compute-stack'
import type { LambdaNodejs } from './components/lambda-nodejs'

class ServiceApp extends cdk.App {
  constructor() {
    super()

    const infraStack = new InfraStack(this)
    const computeStack = new ComputeStack(this)

    computeStack.lambdas.forEach((lambdaFn) => {
      infraStack.sns.addSubscription(
        lambdaFn.lambda,
        createFilterPolicy(lambdaFn),
      )
    })

    function createFilterPolicy(lambdaFn: LambdaNodejs): LambdaSubscriptionProps {
      return {
        filterPolicy: {
          command: SubscriptionFilter.stringFilter({
            allowlist: [lambdaFn.subscription],
          }),
        },
      }
    }
  }
}

new ServiceApp()
