import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import type * as lambda from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

interface ApiGatewayProps {
    name: string
    description?: string
}

export class ApiGateway {
    private readonly gateway: RestApi;

    constructor(scope: Construct, id: string, props: ApiGatewayProps) {
        this.gateway = new RestApi(scope, id, {
            description: props.description,
        });

        this.gateway.root.addMethod('POST');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public addProxyLambda(lambdaHandler: lambda.IFunction) {
        const lambdaIntegration = new LambdaIntegration(lambdaHandler)

        this.gateway.root.addProxy({
            anyMethod: true,
            defaultIntegration: lambdaIntegration
        })
    }
}