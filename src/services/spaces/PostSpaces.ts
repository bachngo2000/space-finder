import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAsSpaceEntry } from "../shared/Validators";
import { createRandomId, parseJSON } from "../shared/Utils";


export async function postSpaces(event: APIGatewayProxyEvent, ddbclient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // get the body of our request
    const randomId = createRandomId();
    const item = parseJSON(event.body);

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