# Space Finder: A serverless, Infrastructure as Code (IaC) application built with AWS and TypeScript | AWS (Cloud Development Kit v2, CloudFormation, Cognito, Lambda, DynamoDB, API Gateway, S3, and Amplify), Typescript, JavaScript, React, NodeJS.

## About
Space Finder is a serverless, Infrastructure as Code (IaC) web application in which users can login and create spaces by uploading, saving, & viewing photos.  The application's frontend was built with React, TypeScript, HTML, and CSS. The application backend was built with AWS.

### Frontend:
The frontend of the application was built using React, TypeScript, HTML, CSS, and AWS Amplify

To learn more, please visit https://github.com/bachngo2000/space-finder-frontend.

 ### Backend:
 The application's AWS-backend was built with AWS Cloud Development Kit v2 using a variety of integrated AWS services and frameworks: CloudFormation, Cognito, Lambda, DynamoDB, API Gateway,  S3, SDK,and Amplify.
 
 - **AWS S3**: used to upload photo files and to deploy the application to the cloud
 - **AWS DynamoDB**: used to create tables with AWS-CDK, write and run queries locally with AWS-CDK v3
 - **AWS Cognito**: used to create user pools to stores user data and provides basic authentication solution -- JWT tokens, & identity pools to generate temporary credentials to run AWS-CDK calls locally and grant fine grained access control to admin users to allow sending data/files from the application to an external source
 - **API Gateway**: used to allow local access to various AWS resources on the cloud using a REST Api

## Walkthrough

Here's a walkthrough of the implemented features:

<img src=walkthrough.gif title='Video Walkthrough' width='' alt='Video Walkthrough' />
