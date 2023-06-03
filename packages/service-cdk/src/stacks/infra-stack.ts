import * as cdk from 'aws-cdk-lib'

import { type Construct } from 'constructs'

import { LambdaNodejs } from '../components/lambda-nodejs'
import { ApiGateway } from '../components/api-gateway'
import { Sns } from '../components/sns'
import { generateId, generateName } from '../util/resource-generator'
import { DISCORD_PUBLIC_KEY } from '../util/discord-constants'

export class InfraStack extends cdk.Stack {
  public readonly apiGateway: ApiGateway
  public readonly proxyLambda: LambdaNodejs
  public readonly sns: Sns

  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, generateId('infra-stack'), props)

    this.proxyLambda = new LambdaNodejs(this, {
      packageFolder: '..',
      packageName: 'proxy-handler',
      packageEntryTs: 'src/proxy-function.ts',
      environment: {
        DISCORD_PUBLIC_KEY,
      },
    })

    this.sns = new Sns(this, generateId('events-topic'), {
      name: generateName('EventsTopic'),
    })
    this.sns.addPublisher(this.proxyLambda.lambda)

    this.apiGateway = new ApiGateway(this, generateId('api-gateway'), {
      name: generateName('Gateway'),
      handler: this.proxyLambda.lambda,
    })
  }
}
