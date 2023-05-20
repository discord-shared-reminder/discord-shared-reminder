import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { type Construct } from 'constructs';

import { ApiGateway } from '../components/api-gateway';
import { Sns } from '../components/sns';
import { generateId, generateName } from '../util/resource-generator';

export class InfraStack extends cdk.Stack {
  private readonly apiGateway: ApiGateway;
  private readonly sns: Sns;


  constructor(scope: Construct, props?: cdk.StackProps) {
    super(scope, generateId('infra-stack'), props);

    this.apiGateway = new ApiGateway(this, generateId('api-gateway'), {
        name: generateName('Gateway')
    })

    this.sns = new Sns(this, generateId('events-topic'), {
        name: generateName('EventsTopic')
    })


    // const proxyLambda = lambda.Function.fromFunctionArn(
    //     this,
    //     generateId("proxy-lambda"),
    //     "arn:aws:lambda:us-east-1:073895145279:function:discord-monthly-reminder-lambdas-ProxyLambda-SGmkPBjRGXJj"
    // )

    // this.apiGateway.addProxyLambda(proxyLambda);
    // this.sns.addPublisher(proxyLambda);
  }
}
