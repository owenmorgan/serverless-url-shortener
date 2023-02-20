import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EdgeLambda extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const edgeFunction = new cdk.aws_cloudfront.experimental.EdgeFunction(
      this,
      "MyFunction",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
        handler: "index.handler",
        code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, "handler")),
        logRetention: cdk.aws_logs.RetentionDays.ONE_DAY,
      }
    );

    new cdk.CfnOutput(this, "LambdaVersion", {
      value: edgeFunction.currentVersion.functionArn,
    });
  }
}
