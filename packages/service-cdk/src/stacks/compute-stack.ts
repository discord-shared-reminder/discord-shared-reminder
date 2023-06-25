import * as cdk from 'aws-cdk-lib'

import { type Construct } from 'constructs'

import { LambdaNodejs } from '../components/lambda-nodejs'
import { generateId } from '../util/resource-generator'
import { DISCORD_TOKEN } from '../util/discord-constants'

export class ComputeStack extends cdk.Stack {
  public readonly lambdas: LambdaNodejs[] = []

  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, generateId('compute-stack'), props)

    this.lambdas.push(new LambdaNodejs(this,
      {
        packageFolder: '../discord-interaction-handler/',
        packageName: 'ping',
        packageEntryTs: 'src/ping.ts',
        export_default: true,
        environment: {
          DISCORD_TOKEN,
        },
      }),
    )
  }
}
