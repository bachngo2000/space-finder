import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";


export async function postSpacesWithDoc(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const ddbDocClient = DynamoDBDocumentClient.from(ddbclient);

    const randomId = v4();

    // get the body of our request
    const item = JSON.parse(event.body);

    item.id = randomId;

    const result = await ddbDocClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,

        Item: item
    }));

    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}