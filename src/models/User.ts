import { Schema, model, Types } from "mongoose";
import { userTypes } from "src/types/user";

const UserSchema = new Schema<userTypes>({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: Number,
  },
  stream_videos: [{ type: Types.ObjectId, ref: "stream_videosc" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create a Model.
const UserModel = model<userTypes>("User", UserSchema);
export default UserModel;
