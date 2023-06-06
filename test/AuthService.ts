import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const awsRegion = 'us-east-2'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'us-east-2_3x703wYpZ',
        userPoolWebClientId: '36946s1bk771e6dt6vqvp7tjkm',
        identityPoolId: 'us-east-2:9e2c9cc3-1cb5-4b44-ac1a-55a54029bc63',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;

    }

    public async generateTemporaryCredentials(user: CognitoUser){
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-2_3x703wYpZ`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'us-east-2:9e2c9cc3-1cb5-4b44-ac1a-55a54029bc63',
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }

}