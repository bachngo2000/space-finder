import { SNSEvent } from "aws-lambda";
import { handler } from "../src/services/monitor/handler";

// an event of type SNSEvent
const snsEvent: SNSEvent = {
    Records: [{
        Sns: {
            Message: 'This is a test'
        }
    }]
} as any;

handler(snsEvent, {});