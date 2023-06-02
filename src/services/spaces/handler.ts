import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    switch (event.httpMethod) {
        case 'GET':
            message = 'Hello from GET!'
            break;
        
        case 'POST':
            message = 'Hello from POST!'
            break;
    
        default:
            break;
    }
    // response of type APIGatewayProxyResult
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message)
    }

    return response;

}

// we need to export te handler function as an object to make it accessible to AWS
export { handler }