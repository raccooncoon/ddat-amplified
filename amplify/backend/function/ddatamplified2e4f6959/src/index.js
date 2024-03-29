const {
    DescribeInstancesCommand,
    EC2Client,
    RebootInstancesCommand,
    StartInstancesCommand,
    StopInstancesCommand
} = require("@aws-sdk/client-ec2");

const axios = require('axios');
// const proxyUrl = 'http://43.201.90.176:58080';
const proxyUrl = 'http://99.0.72.22:58080';
const instanceId = 'i-04c874b08641ae186';
const ec2Client = new EC2Client({ region: "ap-northeast-2" });

async function executeEC2Command(instanceId, command) {
    return ec2Client.send(command);
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const { path, httpMethod } = event;

    console.log("event =>> ", event);

    if (path === '/lambda' && httpMethod === "POST") {
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
                    },
                };
            } else {
                console.log(`Instance ${instanceId}: ${action} action completed, Response: ${JSON.stringify(response)}`);
                return {
                    statusCode: 200,
                    body: `{"status" : "${action}"}`
                };
            }
        } catch (error) {
            console.error(`Error with instance ${instanceId}: ${error}`);
            throw new Error(`Error processing EC2 instance: ${error.message}`);
        }
    }

    return await proxyToApi(event);
};

const proxyToApi = async (event) => {

    console.log("event =>> ", event);
    console.log("proxyUrl =>> ", proxyUrl);
    
    try {
        const { path, httpMethod, headers, queryStringParameters, body } = event;
        const response = await axios({
            method: httpMethod,
            url: proxyUrl + path,
            headers: headers,
            params: queryStringParameters,
            data: body
        });
        console.log("response =>> ", response);
        return {
            statusCode: response.status,
            headers: {
                "Access-Control-Allow-Headers" : "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH"
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.log("error =>> ", error);
        return {
            statusCode: error.response.status || 500,
            headers: error.response.headers || {},
            body: JSON.stringify({ error: error.response.data.message || 'Internal Server Error' })
        };
    }
};
