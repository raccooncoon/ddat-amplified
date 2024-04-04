const axios = require('axios');
// event.json 파일 읽어 오기
// const fs = require('fs');
// const event = JSON.parse(fs.readFileSync('event.json', 'utf8'));

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

  console.log(event);
  const {detail} = event

  const data = {
    ...detail,
    region: event?.region,
  };

  const url = "https://shinsegaegroup.webhook.office.com/webhookb2/947d05b1-dbd6-4f83-92cb-9e26a4c4a59f@d4ffc887-d88d-41cc-bf6a-6bb47ec0f3ca/IncomingWebhook/a54e896ce490485698c2179045e4ee04/319679f3-8914-4f42-a830-d1152eb0b4cf"
  let axiosResponse = await axios.post(url, {text: JSON.stringify(data)}, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(axiosResponse.data)
  }
};

// exports.handler(event)
