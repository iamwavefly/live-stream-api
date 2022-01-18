"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStream = exports.allVideo = exports.allStream = exports.newStream = exports.deleteVideo = exports.uploadVideo = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = (0, tslib_1.__importDefault)(require("aws-sdk"));
const uuid = require("uuid").v4;
const Video_1 = (0, tslib_1.__importDefault)(require("../../../models/stream/Video"));
const Stream_1 = (0, tslib_1.__importDefault)(require("../../../models/stream/Stream"));
const User_1 = (0, tslib_1.__importDefault)(require("../../../models/User"));
const stream_1 = require("../../../validation/stream");
const bytes_1 = (0, tslib_1.__importDefault)(require("bytes"));
const uploadVideo = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const videoMaxSize = 209715200;
    let uploadedVideo = req["file"].originalname.split(".");
    const videoFormat = uploadedVideo[uploadedVideo.length - 1].trim();
    const videoSize = req["file"].size;
    const videoTitle = uploadedVideo[0];
    const videoLen = (yield Video_1.default.find()).length + 1;
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
    const s3Upload = new aws_sdk_1.default.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    try {
        s3Upload.upload(params, (error, data) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(403).json({
                    status: "fail",
                    status_code: 105,
                    message: error.message,
                });
            }
            const stremVideo = new Video_1.default({
                stream_video_url: data.Location,
                stream_video_id: videoLen,
                stream_video_title: videoTitle,
                stream_video_size: (0, bytes_1.default)(String(videoSize)),
                stream_video_duration: (0, bytes_1.default)(String(videoSize)),
                created_by: req.user._id,
            });
            const video = yield stremVideo.save();
            return res.status(201).json({
                status: "success",
                status_code: 100,
                message: video,
            });
        }));
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.uploadVideo = uploadVideo;
// delete uploaded video
const deleteVideo = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { video_id } = req.params;
    // find video by video_id
    const video = yield Video_1.default.findById({ video_id });
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
        Key: video === null || video === void 0 ? void 0 : video.stream_video_url,
    };
    console.log(video);
    // initialize s3
    const S3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    });
    // delete video object
    try {
        S3.deleteObject(params, (error, data) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(403).json({
                    status: "fail",
                    status_code: 105,
                    message: error.message,
                });
            }
            yield video.remove();
            return res.status(201).json({
                status: "success",
                status_code: 100,
                message: "Video removed",
            });
        }));
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.deleteVideo = deleteVideo;
// new stream
const newStream = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    const StreamLen = (yield Stream_1.default.find()).length + 1;
    const StreamVideoId = req.params.video_id;
    const StreamCheck = stream_1.StreamValidate.validate(req.body);
    const streamTitleExit = yield Stream_1.default.findOne({
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
        const newStream = new Stream_1.default(Object.assign(Object.assign({}, req.body), { stream_video: StreamVideoId, stream_id: StreamLen, created_by: user._id }));
        // create stream
        const savedStream = yield newStream.save();
        if (savedStream) {
            yield User_1.default.updateOne({ _id: req.user._id }, { $push: { streams: savedStream._id } });
            return res.status(201).json({
                status: "success",
                status_code: 100,
                message: "Stream created",
            });
        }
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.newStream = newStream;
// get all stream
const allStream = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const userStreams = yield Stream_1.default.find({ created_by: _id })
        .populate("stream_video")
        .populate("created_by");
    const { stream_id, sort_by, limit, page } = req.query;
    try {
        // // find steam by stream_id
        if (stream_id) {
            const stream = yield Stream_1.default.findById(stream_id);
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
        // // sort
        if (sort_by) {
            const streams = yield Stream_1.default.find().sort({ sort_by: "asc" });
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
        // // pagination
        if (page || limit) {
            const streams = yield Stream_1.default.find()
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
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.allStream = allStream;
// get all video
const allVideo = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const userVideo = yield Video_1.default.find({ created_by: _id }).populate("created_by");
    try {
        if (!userVideo) {
            return res.status(200).json({
                status: "success",
                status_code: 105,
                message: "No video found",
            });
        }
        return res.status(200).json({
            status: "success",
            status_code: 100,
            data: userVideo,
        });
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.allVideo = allVideo;
// delete stream
const deleteStream = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { stream_id } = req.params;
    try {
        Stream_1.default.findByIdAndRemove(stream_id, (error, user) => {
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
    }
    catch (error) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: error,
        });
    }
});
exports.deleteStream = deleteStream;
//# sourceMappingURL=index.js.map