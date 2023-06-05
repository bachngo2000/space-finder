import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const awsRegion = 'us-east-2'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'us-east-2_3x703wYpZ',
        userPoolWebClientId: '36946s1bk771e6dt6vqvp7tjkm',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;

    }

}