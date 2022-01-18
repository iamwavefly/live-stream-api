"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcriptVideo = void 0;
const tslib_1 = require("tslib");
const Video_1 = (0, tslib_1.__importDefault)(require("../../../models/stream/Video"));
const Stream_1 = (0, tslib_1.__importDefault)(require("../../../models/stream/Stream"));
const client_transcribe_1 = require("@aws-sdk/client-transcribe");
const Transcript_1 = (0, tslib_1.__importDefault)(require("../../../models/stream/edit/Transcript"));
const transcriptVideo = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { video_id } = req.params;
    const video = yield Video_1.default.findById(video_id);
    if (!video) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: "No video found",
        });
    }
    const rndom = Math.random() * 12232;
    const params2 = {
        TranscriptionJobName: "transcription-job-03" + rndom,
        LanguageCode: "en-US",
        MediaFormat: "mp4",
        Subtitles: { Formats: ["srt"] },
        Media: {
            MediaFileUri: video === null || video === void 0 ? void 0 : video.stream_video_url,
        },
    };
    // Create an Amazon Transcribe service client object
    const client = new client_transcribe_1.TranscribeClient({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey,
        },
    });
    const startTranscription = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        try {
            // const data = await client.send(new StartTranscriptionJobCommand(params2));
            yield client.send(new client_transcribe_1.StartTranscriptionJobCommand(params2));
            getTranscriptionDetails();
        }
        catch (err) {
            if (err)
                return res.status(403).json({
                    status: "fail",
                    status_code: 102,
                    message: err,
                });
        }
    });
    const stream = yield Stream_1.default.findOne({
        stream_video: video === null || video === void 0 ? void 0 : video._id,
    });
    const getTranscriptionDetails = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        // try {
        const data = yield client.send(new client_transcribe_1.GetTranscriptionJobCommand(params2));
        const status = data.TranscriptionJob.TranscriptionJobStatus;
        if (status === "COMPLETED") {
            const transcriptUrl = (_b = (_a = data.TranscriptionJob) === null || _a === void 0 ? void 0 : _a.Subtitles) === null || _b === void 0 ? void 0 : _b.SubtitleFileUris[0];
            // (async () => {
            //   //Wrapping the code with an async function, just for the sake of example.
            //   const transcribe = video?.stream_video_id;
            //   const downloader = new Downloader({
            //     url: data.TranscriptionJob.Transcript.TranscriptFileUri, //If the file name already exists, a new file with the name 200MB1.zip is created.
            //     directory: `./src/temp/`, //This folder will be created, if it doesn't exist.
            //     fileName: `${transcribe}.json`,
            //   });
            //   try {
            //     await downloader.download(); //Downloader.download() returns a promise.
            //     fs.readFile(
            //       `./src/temp/${transcribe}.json`,
            //       "utf8",
            //       (err, data) => {
            //         if (err) {
            //           console.error(err);
            //         }
            //         const json = JSON.parse(data);
            //         const srt = srtConvert(json);
            //         fs.writeFile(`./src/temp/${transcribe}.srt`, srt, (err) => {
            //           if (err) {
            //             console.error(err);
            //           }
            //           // File written successfully
            //           const params = {
            //             Bucket: "worldbankpayint",
            //             Key: `assets/${transcribe}.srt`,
            //             Body: fs.readFileSync(`./src/temp/${transcribe}.srt`),
            //           };
            //           const s3Upload = new AWS.S3({
            //             accessKeyId: process.env.accessKeyId,
            //             secretAccessKey: process.env.secretAccessKey,
            //           });
            //           // upload to s3 server
            //           s3Upload.upload(params, async (error, data) => {
            //             if (error) {
            //               return res.status(403).json({
            //                 status: "fail",
            //                 status_code: 102,
            //                 message: error?.message,
            //               });
            //             }
            //             const dir = `./src/temp/`;
            //             // empty temp directory
            //             fs.readdir(dir, (err, files) => {
            //               if (err)
            //                 return res.status(403).json({
            //                   status: "fail",
            //                   status_code: 102,
            //                   message: err?.message,
            //                 });
            //               for (const file of files) {
            //                 fs.unlink(path.join(dir, file), (err) => {
            //                   if (err)
            //                     return res.status(403).json({
            //                       status: "fail",
            //                       status_code: 102,
            //                       message: err?.message,
            //                     });
            //                 });
            //               }
            //             });
            //           });
            //         });
            //       }
            //     );
            //   } catch (error) {
            //     //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
            //     //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
            //     console.log("Download failed", error);
            //   }
            // })();
            const newTranscript = new Transcript_1.default({
                title: `${video === null || video === void 0 ? void 0 : video.stream_video_title}_transcript`,
                url: transcriptUrl,
                created_by: video === null || video === void 0 ? void 0 : video.stream_video_id,
            });
            stream.stream_transcript = newTranscript === null || newTranscript === void 0 ? void 0 : newTranscript._id;
            yield stream.save();
            if (!newTranscript) {
                return res.status(403).json({
                    status: "fail",
                    status_code: 105,
                    message: "Unable to save transcript",
                });
            }
            return res.status(201).json({
                status: "success",
                status_code: 100,
                message: "Success - StartTranscriptionJobCommand",
                data,
            });
        }
        else if (status === "FAILED") {
            return res.status(403).json({
                status: "fail",
                status_code: 102,
                data: (_c = data === null || data === void 0 ? void 0 : data.TranscriptionJob) === null || _c === void 0 ? void 0 : _c.FailureReason,
            });
        }
        else {
            getTranscriptionDetails();
        }
        // } catch (err) {
        //   if (err)
        //     return res.status(400).json({
        //       status: "fail",
        //       status_code: 102,
        //       mnessage: err,
        //     });
        // }
    });
    startTranscription();
    //   } catch (error) {
    //     return res.status(403).json({
    //       status: "fail",
    //       status_code: 105,
    //       message: error,
    //     });
    //   }
});
exports.transcriptVideo = transcriptVideo;
//# sourceMappingURL=index.js.map