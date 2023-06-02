import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from 'uuid'
import { S3Client, ListBucketsCommand} from '@aws-sdk/client-s3'

const s3Client = new S3Client({});

// the handler function receives an event and a context
// if this lambda is accessed by APIGateWay, then APIGatewayProxyEvent is the type of our event
async function handler(event: APIGatewayProxyEvent, context: Context) {

    const command = new ListBucketsCommand({});

    const listBucketResult = (await s3Client.send(command)).Buckets;

    // response of type APIGatewayProxyResult
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify('Hello from lambda, here are your buckets:' + JSON.stringify(listBucketResult))
    }

    // print the event
    console.log(event);

    return response;

}

// we need to export te handler function as an object to make it accessible to AWS
export { handler }