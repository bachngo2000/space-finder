import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'

// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context) {
    // response of type APIGatewayProxyResult
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify('Hello from lambda using TypeScript!' + v4())
    }

    // print the event
    console.log(event);

    return response;

}

// we need to export te handler function as an object to make it accessible to AWS
export { handler }