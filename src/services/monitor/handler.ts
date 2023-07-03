import { SNSEvent } from "aws-lambda";

// url to send data to our Slack channel
const webHookUrl = 'https://hooks.slack.com/services/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'

// build a lambda that will send data to the webhook of our Slack channel and 
// handler that receives an event of type SNS and a contact
// With this event, we will send a HTTP request to our webhook containing data from our event
// event contains some records (an array of records) -- we can get all kinds of information from this event
// look at the monitor.test.ts file in the test folder to see an example of how this lambda is used
async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Bach, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}

export { handler }