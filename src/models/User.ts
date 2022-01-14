import { Schema, model, Types } from "mongoose";
import { userTypes } from "src/types/user";

const UserSchema = new Schema<userTypes>({
  fullname: {
    type: String,
    required: true,
  },
  auth_id: {
    type: Number,
  },
  auth_type: {
    type: String,
    default: "local",
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  user_id: {
    type: Number,
  },
  streams: [{ type: Types.ObjectId, ref: "Stream" }],
  linked_accounts: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Create a Model.
const UserModel = model<userTypes>("User", UserSchema);
export default UserModel;
