const axios = require('axios');
// const proxyUrl = 'http://43.201.90.176:58080';
const proxyUrl = 'http://99.0.72.22:58080';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    return await proxyToApi(event);
};

const proxyToApi = async (event) => {
    //
    // console.log("event =>> ", event);
    // console.log("proxyUrl =>> ", proxyUrl);
    //
    try {
        const { path, httpMethod, headers, queryStringParameters, body } = event;
        const response = await axios({
            method: httpMethod,
            url: proxyUrl + path,
            headers: headers,
            params: queryStringParameters,
            data: body
        });
        //console.log("response =>> ", response);
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
        //console.log("error =>> ", error);
        return {
            statusCode: error.response.status || 500,
            headers: error.response.headers || {},
            body: JSON.stringify({ error: error.response.data.message || 'Internal Server Error' })
        };
    }
};
