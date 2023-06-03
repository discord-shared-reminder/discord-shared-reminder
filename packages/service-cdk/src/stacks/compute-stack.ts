import * as cdk from 'aws-cdk-lib'

import { type Construct } from 'constructs'

import type { LambdaNodejs } from '../components/lambda-nodejs'
import { generateId } from '../util/resource-generator'

export class ComputeStack extends cdk.Stack {
  public readonly proxyLambda: LambdaNodejs

  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, generateId('compute-stack'), props)

    // this.proxyLambda = new LambdaNodejs(this, {
    //   packageFolder: '..',
    //   packageName: 'proxy-handler',
    //   packageEntryTs: 'src/proxy-function.ts',
    //   environment: {
    //     PUBLIC_KEY: DISCORD_PUBLIC_KEY,
    //   },
    // })
  }
}
