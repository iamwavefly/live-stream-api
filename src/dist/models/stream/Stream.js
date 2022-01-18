"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StreamSchema = new mongoose_1.Schema({
    stream_video: {
        type: mongoose_1.Types.ObjectId,
        ref: "stream_video",
        required: true,
    },
    stream_transcript: {
        type: mongoose_1.Types.ObjectId,
        ref: "transcribe_video",
    },
    stream_id: {
        type: Number,
        required: true,
    },
    stream_title: {
        type: String,
        required: true,
    },
    stream_description: {
        type: String,
        required: true,
    },
    stream_date: {
        type: String,
    },
    tags: {
        type: Array,
    },
    stream_status: {
        type: String,
        default: "Queued",
        enum: ["InProgress", "Streamed", "Queued"],
    },
    stream_platforms: {
        instgram: { type: Boolean, default: false },
        twitter: { type: Boolean, default: false },
        facebook: { type: Boolean, default: false },
        youtube: { type: Boolean, default: false },
        mixlr: { type: Boolean, default: false },
    },
    countdown: { type: Boolean, default: false },
    stream_video_edits: {
        transcribe: { type: Boolean, default: false },
        translate_caption: { type: Boolean, default: false },
        translate_audio: { type: Boolean, default: false },
    },
    created_by: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
StreamSchema.pre("validate", function (next) {
    next();
});
//Create a Model.
const StreamModel = (0, mongoose_1.model)("Stream", StreamSchema);
exports.default = StreamModel;
//# sourceMappingURL=Stream.js.map