import { handler } from "../src/services/spaces/handler"; 

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "SpaceTable-062cd2af5341";

handler({
    httpMethod: 'GET',
} as any, {} as any);