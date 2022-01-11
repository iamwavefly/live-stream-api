import { Request, Response } from "express";
import User from "../../../models/User";
import { UserValidate } from "../../../validation/user";
import bcrypt from "bcryptjs";

export const all = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    status_code: 100,
    message: "Fetch all user",
  });
};
export const user = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || typeof id === undefined) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Invalid user id passed",
    });
  }
  return res.status(200).json({
    status: "success",
    status_code: 100,
    message: "Fetch user",
  });
};
export const newUser = async (req: Request, res: Response) => {
  const { email, fullname, password, password2 } = req.body;
  const userWithEmail = await User.findOne({ email });
  const userCheck = UserValidate.validate(req.body);
  const usersLen = (await User.find()).length + 1;
  try {
    if (userCheck.error) {
      const { details } = userCheck.error;
      const message = details.map((i) => i.message).join(",");
      return res.status(400).json({ message });
    }
    if (password !== password2) {
      return res.status(403).json({
        status: "fail",
        status_code: 105,
        message: "Password misMatch",
      });
    }
    if (userWithEmail) {
      console.log(userWithEmail);
      return res.status(400).json({
        status: "fail",
        status_code: 106,
        message: `User with ${email} already exist`,
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      const newUser = new User({ email, fullname, password, user_id:usersLen });
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({
            status: "fail",
            status_code: 102,
            message: `User registration failed`,
          });
        }
        newUser.password = hash;
        const savedUser = newUser.save();
        return res.status(200).json({
          status: "success",
          status_code: 100,
          data: savedUser,
        });
      });
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        status: "fail",
        status_code: 102,
        message: error,
      });
    }
  }
};
