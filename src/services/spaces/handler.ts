import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";

const ddbclient = new DynamoDBClient({});

// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                message = 'Hello from GET!'
                break;
            
            case 'POST':
                // message = 'Hello from POST!'
                // break;
                const response = postSpaces(event, ddbclient);
                return response;
        
            default:
                break;
        }
        
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
        
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