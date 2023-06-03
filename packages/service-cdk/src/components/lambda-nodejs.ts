import path from 'node:path'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import type { Construct } from 'constructs'
import { generateId } from '../util/resource-generator'

export interface LambdaNodejsProps {
  packageFolder: string
  packageName: string
  packageEntryTs: string
  environment?: { [key: string]: string }
}

export class LambdaNodejs {
  public readonly lambda: lambda.Function

  constructor(scope: Construct, props: LambdaNodejsProps) {
    const basePath = path.join(props.packageFolder, props.packageName)

    this.lambda = new NodejsFunction(
      scope,
      generateId(props.packageName),
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(basePath, props.packageEntryTs),
        bundling: {
          tsconfig: path.join(basePath, 'tsconfig.json'),
        },
        environment: props?.environment || undefined,
      },
    )
  }
}
