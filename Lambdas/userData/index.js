// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });
var ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
  console.log("HERE is the body of event", event.body);
  const userData = JSON.parse(event.body);
  var params = {
    TableName: "user",
    Item: {
      email: userData.email,
      name: userData.name,
      birthdate: userData.birthdate,
      imgurl: userData.url,
    },
  };
  var likesParams = {
    TableName: "likes",
    Item: {
      email: userData.email,
      swipes: [],
    },
  };
  console.log("THIS IS PARAMS::", params);
  console.log("EMAIL:::", userData.email);
  try {
    console.log("RESPONSE::", await ddb.put(params).promise());
  } catch (err) {
    console.log("ERROR::", err.message);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
