import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { hasAdminGroup } from "../shared/Utils";

export async function deleteSpace(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const isAuthorized = hasAdminGroup(event);

    if (!isAuthorized) {
        return {
            statusCode: 401,
            body: JSON.stringify(`Not authorized!`)
        }

    }

    if (event.queryStringParameters && ('id' in event.queryStringParameters)) {

        const spaceId = event.queryStringParameters['id'];
    
        await ddbclient.send(new DeleteItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': {S: spaceId}
            }

        }));

        return {
            statusCode: 200,
            body: JSON.stringify(`Deleted space with id ${spaceId}`)
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args!!')
    }

  
}