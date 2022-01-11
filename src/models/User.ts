import { Schema, model } from "mongoose";
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
});

//Create a Model.
const UserModel = model<userTypes>("User", UserSchema);
export default UserModel;
