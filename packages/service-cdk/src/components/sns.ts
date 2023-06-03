import type * as lambda from 'aws-cdk-lib/aws-lambda'
import { type SubscriptionProps, Topic } from 'aws-cdk-lib/aws-sns'
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions'
import type { Construct } from 'constructs'

interface SnsProps {
  name: string
}

export class Sns {
  private readonly topic: Topic

  constructor(scope: Construct, id: string, props: SnsProps) {
    this.topic = new Topic(scope, id, {
      topicName: props.name,
    })
  }

  public addSubscription(lambdaHandler: lambda.Function, props: SubscriptionProps) {
    this.topic.addSubscription(
      new LambdaSubscription(lambdaHandler, props),
    )
  }

  public addPublisher(lambdaHandler: lambda.IFunction) {
    this.topic.grantPublish(
      lambdaHandler,
    )
  }
}
