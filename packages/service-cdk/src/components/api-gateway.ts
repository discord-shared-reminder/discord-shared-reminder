import { Cors, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import type { IFunction } from 'aws-cdk-lib/aws-lambda'
import type { Construct } from 'constructs'

interface ApiGatewayProps {
  name: string
  description?: string
  handler: IFunction
}

export class ApiGateway {
  public readonly gateway: LambdaRestApi

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    this.gateway = new LambdaRestApi(scope, id, {
      description: props.description,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
      },
      proxy: true,
      handler: props.handler,
      deploy: true,
    },
    )
  }
}
