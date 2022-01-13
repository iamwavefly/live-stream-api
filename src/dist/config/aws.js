"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = (0, tslib_1.__importDefault)(require("aws-sdk"));
exports.s3Upload = new aws_sdk_1.default.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
});
console.log(process.env.accessKeyId);
//# sourceMappingURL=aws.js.map