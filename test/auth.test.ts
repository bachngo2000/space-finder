import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'bachngo193',
        'Quangdien@2013'
    )

    //console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
    const credentials = await service.generateTemporaryCredentials(loginResult);
    console.log(credentials);
}

testAuth();