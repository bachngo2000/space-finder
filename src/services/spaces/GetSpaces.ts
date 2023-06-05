import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get } from "http";


export async function getSpaces(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters) {
        if ('id' in event.queryStringParameters) {
            const spaceId = event.queryStringParameters['id'];
            const getItemResponse = await ddbclient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': {S: spaceId}
                }
            }))

            if (getItemResponse.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(getItemResponse.Item)
                }
            }

            else {
                return {
                    statusCode: 400,
                    body: JSON.stringify(`Space with id ${spaceId} not found!`)
                }

            }
        }

        else {
            return {
                statusCode: 400,
                body: JSON.stringify('Id required!')
            }
        }
    }
    const result = await ddbclient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));

    console.log(result.Items);

    return {
        statusCode: 201,
        body: JSON.stringify(result.Items)
    }
}