import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

// created a LambdaStack stack that consists of multiple lambdas
export class LambdaStack extends Stack {

    public readonly helloLambdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        //create a new Lambda
        // 'handler' specifies the code that will be executed inside the lambda
        const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname, '..','..', 'services'))
        })

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda)
    }
}