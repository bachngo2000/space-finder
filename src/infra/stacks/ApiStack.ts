import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
    helloLambdaIntegration: LambdaIntegration
}

// created an empty stack
export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // created a construct
        const api = new RestApi(this, 'SpacesApi');
        const spacesResource = api.root.addResource('spaces');
        spacesResource.addMethod('GET', props.helloLambdaIntegration);
    }
}