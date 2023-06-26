import path from 'node:path'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import type { Construct } from 'constructs'
import { Duration } from 'aws-cdk-lib'
import { generateId } from '../util/resource-generator'

export interface LambdaNodejsProps {
  packageFolder: string
  packageName: string
  packageEntryTs: string
  export_default?: boolean
  environment?: { [key: string]: string }
}

export class LambdaNodejs {
  public readonly lambda: lambda.Function
  public readonly subscription: string

  constructor(scope: Construct, props: LambdaNodejsProps) {
    const basePath = path.join(props.packageFolder, props.packageName)

    this.subscription = props.packageName

    this.lambda = new NodejsFunction(
      scope,
      generateId(props.packageName),
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(basePath, props.packageEntryTs),
        handler: props.export_default ? 'index.default.handler' : undefined,
        bundling: {
          tsconfig: path.join(basePath, 'tsconfig.json'),
        },
        environment: props?.environment || undefined,
        timeout: Duration.seconds(15),
      },
    )
  }
}
