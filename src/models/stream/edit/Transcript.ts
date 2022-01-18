import { Schema, model, Types } from "mongoose";
import { TranscribeVideo } from "../../../types/transcript";

const TranscribeVideo = new Schema<TranscribeVideo>({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
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

//Create a Model.
const TranscribeModel = model<TranscribeVideo>(
  "transcribe_video",
  TranscribeVideo
);
export default TranscribeModel;
