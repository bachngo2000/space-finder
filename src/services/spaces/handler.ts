import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { get } from "http";
import { updateSpace } from "./UpdateSpace";

const ddbclient = new DynamoDBClient({});

// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                // message = 'Hello from GET!'
                // break;
                const getResponse = await getSpaces(event, ddbclient);
                console.log(getResponse)
                return getResponse;
            case 'POST':
                // message = 'Hello from POST!'
                // break;
                const postResponse = await postSpaces(event, ddbclient);
                return postResponse;
            case 'PUT':
                // message = 'Hello from POST!'
                // break;
                const putResponse = await updateSpace(event, ddbclient);
                console.log(putResponse)
                return putResponse;
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