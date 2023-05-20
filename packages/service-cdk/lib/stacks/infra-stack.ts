import * as cdk from 'aws-cdk-lib';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
import { type Construct } from 'constructs';

import { ApiGateway } from '../components/api-gateway';
import { Sns } from '../components/sns';
import { generateId, generateName } from '../util/resource-generator';
// import path = require('path');

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


    // const proxyLambda = new lambda.Function(
    //     this,
    //     generateId("proxy-lambda"),
    //     {
    //       runtime: lambda.Runtime.NODEJS_18_X,
    //       handler: "lambda_seila.handler",
    //       code: lambda.Code.fromAsset(
    //         path.join(
    //           require.resolve('lambda_seila'),
    //           '..'
    //         )
    //       )
    //     }
    // )

    // this.apiGateway.addProxyLambda(proxyLambda);
    // this.sns.addPublisher(proxyLambda);
  }
}
