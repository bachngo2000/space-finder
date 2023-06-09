import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validators";
import { addCorsHeader } from "../shared/Utils";
import { captureAWSv3Client, getSegment } from 'aws-xray-sdk-core'; 

// In order to obtain information about the initialization of our client or how many queries are taking place
// const ddbclient = new DynamoDBClient({});

// We will wrap our DynamoDBClient inside this captureAWSv3Client
// It is still a DynamoDBClient like above, but now, we can trace calls to our client
const ddbclient = captureAWSv3Client(new DynamoDBClient({}))

// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    // let message: string;

    let response: APIGatewayProxyResult;

    const subSeg = getSegment().addNewSubsegment('MyLongCall')
    await new Promise(resolve =>{ setTimeout(resolve, 3000)});
    subSeg.close();

    const subSeg2 = getSegment().addNewSubsegment('MyShortCall')
    await new Promise(resolve =>{ setTimeout(resolve, 500)})
    subSeg2.close();

    try {
        switch (event.httpMethod) {
            case 'GET':
                // message = 'Hello from GET!'
                // break;
                const getResponse = await getSpaces(event, ddbclient);
                // console.log(getResponse)
                // addCorsHeader(getResponse)
                // return getResponse;
                response = getResponse;
                break;
            case 'POST':
                // message = 'Hello from POST!'
                // break;
                const postResponse = await postSpaces(event, ddbclient);
                // return postResponse;
                response = postResponse;
                break;
            case 'PUT':
                // message = 'Hello from POST!'
                // break;
                const putResponse = await updateSpace(event, ddbclient);
                // console.log(putResponse)
                // return putResponse;
                response = putResponse;
                break;
            case 'DELETE':
                const deleteResponse = await deleteSpace(event, ddbclient);
                // console.log(deleteResponse)
                // return deleteResponse;
                response = deleteResponse;
                break;
            default:
                break;
        }
        
    } catch (error) {
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }

        if (error instanceof JsonError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        
        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
        
    }

    // response of type APIGatewayProxyResult
    // const response: APIGatewayProxyResult = {
    //     statusCode: 200,
    //     body: JSON.stringify(message)
    // }
    addCorsHeader(response);
    return response;

}

// we need to export te handler function as an object to make it accessible to AWS
export { handler }