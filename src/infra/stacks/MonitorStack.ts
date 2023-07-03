import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Alarm, Metric, Unit } from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { join } from "path";

//created a new stack, a monitoring stack for our AWS CloudWatch alarm
export class MonitorStack extends Stack {
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // create a new AWS Lambda that will link to our SNS topic
        // the lambda will send a simple HTTP request, so we don't need to add any special access rights
        const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            // entry where we will specify the code for this lambda
            entry: (join(__dirname, '..','..', 'services', 'monitor', 'handler.ts'))
        });

        //create our SNS topic
        const alarmTopic = new Topic(this, 'AlarmTopic', {
            displayName: 'AlarmTopic',
            topicName: 'AlarmTopic'
        });

        // link the SNS topic alarmTopic to the webHookLamba lambda above
        // everytime this topic receives a message or an event, it will trigger this lambda
        alarmTopic.addSubscription(new LambdaSubscription(webHookLambda));

        const spacesApi4xxAlarm = new Alarm(this, 'spacesApi4xxAlarm', {
            //specify a new metric for the alarm
            metric: new Metric({
                metricName: '4XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "SpacesApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 5,
            alarmName: 'SpacesApi4xxAlarm'
        });

        // link the alarmTopic topic to our spacesApi4xxAlarm alarm
        // first, create an SNS action that receives our topic
        const topicAction = new SnsAction(alarmTopic);
        // use this action to trigger our alarm
        spacesApi4xxAlarm.addAlarmAction(topicAction);
        spacesApi4xxAlarm.addOkAction(topicAction);
    }
}