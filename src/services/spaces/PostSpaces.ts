import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateAsSpaceEntry } from "../shared/Validators";


export async function postSpaces(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const randomId = v4();

    // get the body of our request
    const item = JSON.parse(event.body);

    item.id = randomId;

    validateAsSpaceEntry(item)

    const result = await ddbclient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,

        // Item: {
        //     id: {
        //         S: randomId
        //     },
        //     location: {
        //         S: item.location
        //     }
        // }

        Item: marshall(item)
    }));

    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({id: randomId})
    }
}