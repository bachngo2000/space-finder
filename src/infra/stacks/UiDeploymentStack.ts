import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { join } from "path";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { existsSync } from "fs";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

// create a stack for UI deployment
export class UiDeploymentStack extends Stack {
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        // create an s3 bucket to store our UI data for deployment
        const deploymentBucket = new Bucket(this, 'uiDeploymentBucket', {
            bucketName: `space-finder-frontend-${suffix}`
        });

        // create reference to our UI directory
        const uiDir = join(__dirname, '..', '..', '..', '..', 'space-finder-frontend', 'dist');

        if (!existsSync(uiDir)) {
            console.warn('Ui directory not found: ' + uiDir);
            return;
        }
        
        // create a deployment bucket
        new BucketDeployment(this, 'SpacesFinderDeployment', {
            destinationBucket: deploymentBucket,
            sources: [
                Source.asset(uiDir)
            ]
        })

        //Create a construct originIdentity that can read from that bucket
        const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');

        // grant access to the originIdentity construct to read from the deployment bucket
        deploymentBucket.grantRead(originIdentity);

        // Create a CloudFrontDistribution that takes our files and put them in our distribution, and that distribution will read the data from our deploymnet bucket
        const distribution = new Distribution(this, 'SpacesFinderDistribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(deploymentBucket, {
                    originAccessIdentity: originIdentity
                })
            }
        });

        // output the url of our distribution for us to know what to access 
        new CfnOutput(this, 'SpaceFinderUrl', {
            value: distribution.distributionDomainName
        })
        
    }
}