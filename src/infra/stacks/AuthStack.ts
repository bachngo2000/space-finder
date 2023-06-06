import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { CfnIdentityPool, CfnUserPoolGroup, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { FederatedPrincipal, Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class AuthStack extends Stack {

    // We will need this userPool and userPoolClient throughout the class and outside of the class
    public userPool: UserPool;

    private userPoolClient: UserPoolClient;

    private identityPool: CfnIdentityPool;

    private authenticatedRole: Role;

    private unAuthenticatedRole: Role;

    private adminRole: Role;


    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
        this.createAdminsGroup();
        this.createIdentityPool();
        this.createRoles();
        // this.attachRoles();
    }

    private createUserPool() {
        this.userPool =  new UserPool(this, 'SpaceUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });

        new CfnOutput(this, 'SpaceUserPoolId', {
            value: this.userPool.userPoolId
        })
    }

    private createUserPoolClient() {
        this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        });

        new CfnOutput(this, 'SpaceUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }

    private createAdminsGroup() {
        new CfnUserPoolGroup(this, 'SpaceAdmins', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'admins'
        } )
    }

    private createIdentityPool() {
        this.identityPool = new CfnIdentityPool(this, 'SpaceItentityPool', {
            allowUnauthenticatedIdentities: true,
            cognitoIdentityProviders: [{
                clientId: this.userPoolClient.userPoolClientId,
                providerName: this.userPool.userPoolProviderName
            }]
        })
        new CfnOutput(this, 'SpaceItentityPoolId', {
            value: this.identityPool.ref
        })
    }

    private createRoles(){
        this.authenticatedRole = new Role(this, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });
        this.unAuthenticatedRole = new Role(this, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'unauthenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });
        this.adminRole = new Role(this, 'CognitoAdminRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });
    }
}