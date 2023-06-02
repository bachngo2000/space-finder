import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
    // helloLambdaIntegration: LambdaIntegration
    spacesLambdaIntegration: LambdaIntegration

}

// created an empty stack
export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // created a construct
        // const api belongs to this and has an id of SpacesApi
        const api = new RestApi(this, 'SpacesApi');
        // add a resource by hand
        const spacesResource = api.root.addResource('spaces');
        // add a simple GET method.
        // here we need an integration object because our lambda is in a different stack. We need to export that from the  Lambdastack and import it in. So inside our API stack, this means that we need to extend our properties and this means that we need to make these two stacks communicate with each other.
        spacesResource.addMethod('GET', props.spacesLambdaIntegration);
        spacesResource.addMethod('POST', props.spacesLambdaIntegration);

    }
}