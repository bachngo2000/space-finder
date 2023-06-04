import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";


export async function postSpaces(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const randomId = v4();

    // get the body of our request
    const item = JSON.parse(event.body);

    item.id = randomId;

    const result = await ddbclient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME, 
        Item: {
            id: {
                S: randomId
            },
            location: {
                S: item.location
            }
        }
    }));

    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}