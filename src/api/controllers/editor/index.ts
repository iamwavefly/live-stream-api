import { Response } from "express";
import Video from "../../../models/stream/Video";
import StreamVideo from "../../../models/stream/Stream";
import {
  TranscribeClient,
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";
import TranscribeVideo from "../../../models/stream/edit/Transcript";

export const transcriptVideo = async (req, res: Response) => {
  const { video_id } = req.params;
  const video = await Video.findById(video_id);

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
      MediaFileUri: video?.stream_video_url,
    },
  };
  // Create an Amazon Transcribe service client object
  const client = new TranscribeClient({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });

  const startTranscription = async () => {
    try {
      // const data = await client.send(new StartTranscriptionJobCommand(params2));
      await client.send(new StartTranscriptionJobCommand(params2));
      getTranscriptionDetails();
    } catch (err) {
      if (err)
        return res.status(403).json({
          status: "fail",
          status_code: 102,
          message: err,
        });
    }
  };

  const stream = await StreamVideo.findOne({
    stream_video: video?._id,
  });

  const getTranscriptionDetails = async () => {
    // try {
    const data = await client.send(new GetTranscriptionJobCommand(params2));
    const status = data.TranscriptionJob.TranscriptionJobStatus;
    if (status === "COMPLETED") {
      const transcriptUrl =
        data.TranscriptionJob?.Subtitles?.SubtitleFileUris[0];
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
      const newTranscript = new TranscribeVideo({
        title: `${video?.stream_video_title}_transcript`,
        url: transcriptUrl,
        created_by: video?.stream_video_id,
      });
      stream.stream_transcript = newTranscript?._id;
      await stream.save();
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
    } else if (status === "FAILED") {
      return res.status(403).json({
        status: "fail",
        status_code: 102,
        data: data?.TranscriptionJob?.FailureReason,
      });
    } else {
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
  };

  startTranscription();
  //   } catch (error) {
  //     return res.status(403).json({
  //       status: "fail",
  //       status_code: 105,
  //       message: error,
  //     });
  //   }
};
