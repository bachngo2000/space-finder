import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Utils';

// created an Data stack that contains a Dynamo DB table
export class DataStack extends Stack {

    // ITable is an interface that represents a DynamoDB Table
    // We do this so we can reference the table in other stacks
    public readonly spacesTable: ITable

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // getting suffix from the stack to form the db table's name
        const suffix = getSuffixFromStack(this);

        this.spacesTable = new Table(this, 'SpacesTable', {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `SpaceTable-${suffix}`
        })
    }
}