const {
    DescribeInstancesCommand,
    EC2Client,
    RebootInstancesCommand,
    StartInstancesCommand,
    StopInstancesCommand
} = require("@aws-sdk/client-ec2");

const instanceId = 'i-04c874b08641ae186';
const ec2Client = new EC2Client({ region: "ap-northeast-2" });

async function executeEC2Command(instanceId, command) {
    return ec2Client.send(command);
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { path, httpMethod } = event;

    console.log("event =>> ", event);

    if (path === '/ec2' && httpMethod === "POST") {
        const { action } = JSON.parse(event.body);
        try {
            let command;
            switch (action.toLowerCase()) {
                case 'start':
                    command = new StartInstancesCommand({ InstanceIds: [instanceId] });
                    break;
                case 'stop':
                    command = new StopInstancesCommand({ InstanceIds: [instanceId] });
                    break;
                case 'reboot':
                    command = new RebootInstancesCommand({ InstanceIds: [instanceId] });
                    break;
                case 'status':
                    command = new DescribeInstancesCommand({ InstanceIds: [instanceId] });
                    break;
                default:
                    throw new Error('Invalid action. Use "start", "stop", "reboot", or "status".');
            }

            console.log("command =>> ", command);

            const response = await executeEC2Command(instanceId, command);
            console.log(`Instance ${instanceId}: ${action} action completed, Response: ${JSON.stringify(response)}`);

            if (action === 'status') {
                // Parse the response to get instance status
                const instanceStatus = response.Reservations[0].Instances[0].State.Name;
                console.log(`Instance ${instanceId} status: ${instanceStatus}`);
                return {
                    statusCode: 200,
                    body: `{"status" : "${instanceStatus}"}`,
                    headers: {
                        "Access-Control-Allow-Headers" : "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    }
                };
            } else {
                console.log(`Instance ${instanceId}: ${action} action completed, Response: ${JSON.stringify(response)}`);
                return {
                    statusCode: 200,
                    body: `{"status" : "${action}"}`,
                    headers: {
                        "Access-Control-Allow-Headers" : "*",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    }
                };
            }
        } catch (error) {
            console.error(`Error with instance ${instanceId}: ${error}`);
            throw new Error(`Error processing EC2 instance: ${error.message}`);
        }
    }
};
