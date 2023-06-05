import { handler } from "../src/services/spaces/handler"; 

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "SpaceTable-062cd2af5341";

handler({
    httpMethod: 'PUT',
    queryStringParameters: {
        id: '6463308e-179d-4ecb-a75c-9e2bbb98cac8'
    },
    body: JSON.stringify({
        location: 'London is now Austin'
    })

} as any, {} as any);