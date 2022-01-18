import { Schema, model, Types } from "mongoose";
import { videoTypes } from "../../types/video";

const StreamVideoSchema = new Schema<videoTypes>({
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
    type: Types.ObjectId,
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

StreamVideoSchema.pre("validate", async function (next) {
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

//Create a Model.
const StreamVideoModel = model<videoTypes>("stream_video", StreamVideoSchema);
export default StreamVideoModel;
