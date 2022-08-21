// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB.DocumentClient();
const idgenerator = () => {
  return Math.floor(Math.random() * 10000);
};
exports.handler = async (event) => {
  console.log("HERE is the body of event", event.body);
  const data = JSON.parse(event.body);

  var likesParams = {
    TableName: "likes",
    Item: {
      id: idgenerator(),
      email: data.email,
      sEmail: data.sEmail,
    },
  };

  console.log("EMAIL:::", data.email);
  try {
    console.log("RESPONSE2::", await ddb.put(likesParams).promise());
  } catch (err) {
    console.log("ERROR::", err.message);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
