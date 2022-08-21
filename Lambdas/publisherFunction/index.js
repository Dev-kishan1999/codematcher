// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set region
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event) => {
  //const content = JSON.parse(event.body)

  // Create publish parameters
  var params = {
    Message: "content" /* required */,
    TopicArn: "arn:aws:sns:us-east-1:404283073288:match",
  };

  // Create promise and SNS service object
  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  await publishTextPromise
    .then(function (data) {
      console.log("Message send.");
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

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
