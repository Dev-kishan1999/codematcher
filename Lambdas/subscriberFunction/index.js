// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set region
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
  // Create subscribe/email parameters
  const userEmail = JSON.parse(event.body);
  var params = {
    Protocol: "email" /* required */,
    TopicArn: "arn:aws:sns:us-east-1:404283073288:match" /* required */,
    Endpoint: userEmail.email,
  };

  console.log(params);
  // Create promise and SNS service object

  let response = {};

  var subscribePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .subscribe(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  await subscribePromise
    .then(function (data) {
      console.log("Subscription ARN is " + data.SubscriptionArn);
      console.log({
        statusCode: 200,
        body: JSON.stringify(data),
      });
    })
    .catch(function (err) {
      console.error(err, err.stack);
      console.log({
        statusCode: 500,
        body: JSON.stringify(err),
      });
    });
};
