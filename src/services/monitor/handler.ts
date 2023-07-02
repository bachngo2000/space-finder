import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

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