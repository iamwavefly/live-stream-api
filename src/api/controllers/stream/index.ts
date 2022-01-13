import { Response } from "express";
import AWS from "aws-sdk";
const uuid = require("uuid").v4;
import StreamVideo from "../../../models/stream/Video";
import Stream from "../../../models/stream/Stream";
import User from "../../../models/User";
import { StreamValidate } from "../../../validation/stream";
import bytes from "bytes";

export const uploadVideo = async (req, res: Response) => {
  const videoMaxSize = 209715200;
  let uploadedVideo = req["file"].originalname.split(".");
  const videoFormat = uploadedVideo[uploadedVideo.length - 1].trim();
  const videoSize = req["file"].size;
  const videoTitle = uploadedVideo[0];
  const videoLen = (await StreamVideo.find()).length + 1;
  const user = await User.findById(req.user._id);
  // check video format
  if (videoFormat !== "mp4") {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Sorry, only mp4 video format allow",
    });
  }
  // check video size
  if (videoSize > videoMaxSize) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Sorry, you can only upload 200mb or less of video in size",
    });
  }
  const params = {
    Bucket: "worldbankpayint",
    Key: `assets/${uuid()}.${videoFormat}`,
    Body: req["file"].buffer,
  };
  const s3Upload = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  });
  try {
    s3Upload.upload(params, async (error, data) => {
      if (error) {
        return res.status(403).json({
          status: "fail",
          status_code: 105,
          message: error.message,
        });
      }
      const stremVideo = new StreamVideo({
        stream_video_url: data.Location,
        stream_video_id: videoLen,
        stream_video_title: videoTitle,
        stream_video_size: bytes(videoSize),
        created_by: req.user._id,
      });
      const video = await stremVideo.save();
      const { id } = video;
      user?.stream_videos?.push(id as never);
      await user.save();
      return res.status(201).json({
        status: "success",
        status_code: 100,
        message: video,
      });
    });
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: error,
    });
  }
};
// delete uploaded video
export const deleteVideo = async (req, res: Response) => {
  const { video_id } = req.params;
  // find video by video_id
  const video = await StreamVideo.findById({ video_id });
  if (!video) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Video not found",
    });
  }
  // check video format
  const params = {
    Bucket: "worldbankpayint",
    Key: video?.stream_video_url,
  };
  // initialize s3
  const S3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  });
  // delete video object
  try {
    S3.deleteObject(params, async (error, data) => {
      if (error) {
        return res.status(403).json({
          status: "fail",
          status_code: 105,
          message: error.message,
        });
      }
      await video.remove();
      return res.status(201).json({
        status: "success",
        status_code: 100,
        message: "Video removed",
      });
    });
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: error,
    });
  }
};
// new stream
export const newStream = async (req, res: Response) => {
  const user = await User.findById(req.user._id);
  const StreamLen = (await Stream.find()).length + 1;
  const StreamVideoId = req.params.video_id;
  const StreamCheck = StreamValidate.validate(req.body);
  const streamTitleExit = await Stream.findOne({
    stream_title: req.body.stream_title,
  });
  try {
    //   check for null object
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: "fail",
        status_code: 105,
        message: "Null object detected",
      });
    }
    //   check for stream title
    if (streamTitleExit) {
      console.log(streamTitleExit);
      return res.status(400).json({
        status: "fail",
        status_code: 102,
        message: "Stream title already exist",
      });
    }
    //   validate data
    if (StreamCheck.error) {
      const { details } = StreamCheck.error;
      const message = details.map((i) => i.message).join(",");
      return res
        .status(400)
        .json({ status: "fail", status_code: 105, message });
    }
    //   init new stream
    const newStream = new Stream({
      ...req.body,
      stream_video_id: StreamVideoId,
      stream_id: StreamLen,
      created_by: user._id,
    });
    // create stream
    const savedStream = await newStream.save();
    if (savedStream) {
      return res.status(201).json({
        status: "success",
        status_code: 100,
        message: "Stream created",
      });
    }
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: error,
    });
  }
};
// get all stream
export const allStream = async (req, res: Response) => {
  const { id } = req.user;
  const userStreams = await Stream.findById(id).sort({ created_at: "asc" });
  const { stream_id, sort_by, limit, page } = req.query;
  try {
    // find steam by stream_id
    if (stream_id) {
      const stream = await Stream.findById(stream_id).lean();
      if (!stream) {
        return res.status(400).json({
          status: "fail",
          status_code: 105,
          message: "No stream found",
        });
      }
      return res.status(200).json({
        status: "success",
        status_code: 100,
        data: stream,
      });
    }
    // sort
    if (sort_by) {
      const streams = await Stream.find().sort({ sort_by: "asc" });
      if (!streams) {
        return res.status(400).json({
          status: "fail",
          status_code: 105,
          message: "No stream found",
        });
      }
      return res.status(200).json({
        status: "success",
        status_code: 100,
        data: streams,
      });
    }
    // pagination
    if (page || limit) {
      const streams = await Stream.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

      return res.status(200).json({
        status: "success",
        status_code: 100,
        data: streams,
      });
    }
    return res.status(200).json({
      status: "success",
      status_code: 100,
      data: userStreams,
    });
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: error,
    });
  }
};
// delete stream
export const deleteStream = async (req, res: Response) => {
  const { stream_id } = req.params;
  try {
    Stream.findByIdAndRemove(stream_id, (error, user) => {
      if (error) {
        return res.status(400).json({
          status: "fail",
          status_code: 105,
          message: error,
        });
      }
      return res.status(200).json({
        status: "deleted",
        status_code: 100,
        message: "Stream deleted",
      });
    });
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: error,
    });
  }
};
