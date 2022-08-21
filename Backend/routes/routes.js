const express = require("express");
const router = express.Router();
const convertapi = require("convertapi")("BALUtsv1heiPUlWP");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const aws = require("aws-sdk");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

aws.config.update({ region: "us-east-1" });
var s3bucket = new aws.S3({ apiVersion: "2006-03-01" });

// convert function
// const convert = (snippet) => {
//   console.log("Here 1");
//   convertapi
//     .convert(
//       "png",
//       {
//         File: snippet,
//       },
//       "txt"
//     )
//     .then(function (result) {
//       result.saveFiles(path.join(__dirname, "snippet.png"));
//     });
// };

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/uploadpng", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  return res.status(200).json(result);
});

// function to upload files...
const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  var uploadParamas = {
    Bucket: "codematcherprofile",
    Key: file.filename + ".png",
    Body: fileStream,
  };

  return s3bucket.upload(uploadParamas).promise();
};

router.get("/allusers", async (req, res) => {
  var ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });
  var params = {
    TableName: "user",
  };

  ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log("Success::", data.Items);
      return res.status(200).json(data.Items);
    }
  });
});

router.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  var ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

  var findParams = {
    TableName: "user",
    KeyConditionExpression: "email = :emailValue",

    ExpressionAttributeValues: {
      ":emailValue": { S: email },
    },
  };

  ddb.query(findParams, (err, data) => {
    if (err) {
      console.log("ERROR:", err.message);
    } else {
      console.log("SUCCESS:", data.Items);
      return res.status(200).json(data.Items[0]);
    }
  });
});

module.exports = router;
