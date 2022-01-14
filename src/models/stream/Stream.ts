import { Schema, model, Types } from "mongoose";
import { userTypes } from "src/types/user";

const StreamSchema = new Schema({
  stream_video: {
    type: Types.ObjectId,
    ref: "stream_video",
    required: true,
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
    type: Types.ObjectId,
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
const StreamModel = model<userTypes>("Stream", StreamSchema);
export default StreamModel;
