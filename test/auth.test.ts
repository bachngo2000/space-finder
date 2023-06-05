import { AuthService } from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'bachngo193',
        'Quangdien@2013'
    )

    console.log(loginResult);
}

testAuth();