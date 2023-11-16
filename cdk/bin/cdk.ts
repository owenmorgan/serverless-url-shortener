#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { EdgeLambda } from "../lib/cdk-stack";

const app = new cdk.App();
new EdgeLambda(app, "EdgeLambda", {
  env: { account: "077017540186", region: "us-east-1" },
});
