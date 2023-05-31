import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

// created an empty stack
export class DataStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)
    }
}