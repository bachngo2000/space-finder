import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}
// created a LambdaStack stack that consists of multiple lambdas
export class LambdaStack extends Stack {

    // for cross referencing among stacks
    // public readonly helloLambdaIntegration: LambdaIntegration

    public readonly spacesLambdaIntegration: LambdaIntegration


    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        //create a new Lambda
        // 'handler' specifies the code that will be executed inside the lambda
        // const helloLambda = new LambdaFunction(this, 'HelloLambda', {
        //     runtime: Runtime.NODEJS_18_X,
        //     handler: 'hello.main',
        //     code: Code.fromAsset(join(__dirname, '..','..', 'services')),
        //     environment: {
        //         TABLE_NAME: props.spacesTable.tableName
        //     }
        // })

        //create a Nodejs Lambda
        // const helloLambda = new NodejsFunction(this, 'HelloLambda', {
        //     runtime: Runtime.NODEJS_18_X,
        //     handler: 'handler',
        //     entry: (join(__dirname, '..','..', 'services', 'hello.ts')),
        //     environment: {
        //         TABLE_NAME: props.spacesTable.tableName
        //     }
        // });


        // helloLambda.addToRolePolicy(new PolicyStatement({
        //     effect: Effect.ALLOW,
        //     actions: [
        //         's3:ListAllMyBuckets',
        //         's3:ListBucket'
        //     ],
        //     resources: ["*"]
        // }))

        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..','..', 'services', 'spaces', 'handler.ts')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        });

        spacesLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.spacesTable.tableArn],
            actions: [
                'dynamodb:PutItem'
            ]
        }))


        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
    }
}