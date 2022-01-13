import AWS from "aws-sdk";
export const s3Upload = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

console.log(process.env.accessKeyId);
