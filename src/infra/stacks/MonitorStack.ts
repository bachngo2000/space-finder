import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

//created a new stack, a monitoring stack for our AWS CloudWatch alarm
export class MonitorStack extends Stack {
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
    }
}