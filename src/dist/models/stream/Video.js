"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const StreamVideoSchema = new mongoose_1.Schema({
    stream_video_url: {
        type: String,
        required: true,
    },
    stream_video_id: {
        type: Number,
        required: true,
    },
    stream_video_size: {
        type: Number,
        required: true,
    },
    stream_video_duration: {
        type: Number,
        required: true,
    },
    stream_video_title: {
        type: String,
        required: true,
    },
    stream_audio_url: {
        type: String,
    },
    created_by: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
// const uploadToAws = (filePath: string, ext: string) => {
//   console.log(filePath + ext);
//   const params = {
//     Bucket: "worldbankpayint",
//     Key: `assets/audio/${filePath}${ext}`,
//     Body: filePath + ext,
//   };
//   const s3Upload = new AWS.S3({
//     accessKeyId: process.env.accessKeyId,
//     secretAccessKey: process.env.secretAccessKey,
//   });
//   s3Upload.upload(params, async (error, data) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log(data);
//   });
// };
// const convert = (input, output, callback) => {
//   ffmpeg(input)
//     .output(output)
//     .on("end", function () {
//       console.log("conversion ended");
//       uploadToAws(output, ".mp3");
//       callback(null);
//     })
//     .on("error", function (err) {
//       console.log("error: ", err);
//       callback(err);
//     })
//     .run();
// };
StreamVideoSchema.pre("validate", function (next) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // if (this.stream_video_url) {
        //     const audioFileName = `./src/temp/${
        //       this.stream_video_title + this.stream_video_id
        //   }`;
        //       convert(this.stream_video_url, `${audioFileName}.mp3`, (err) => {
        //       console.log("new");
        //        if (!err) {
        //      }
        //    });
        // }
        next();
    });
});
//Create a Model.
const StreamVideoModel = (0, mongoose_1.model)("stream_video", StreamVideoSchema);
exports.default = StreamVideoModel;
//# sourceMappingURL=Video.js.map