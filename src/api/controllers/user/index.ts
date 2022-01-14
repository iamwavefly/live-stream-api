import { Request, Response } from "express";
import User from "../../../models/User";
import { UserValidate } from "../../../validation/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as queryString from "query-string";
import passport from "passport";

export const all = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    status_code: 100,
    message: "Fetch all user",
  });
};
export const user = async (req, res: Response) => {
  const { _id } = req?.user;
  const user = await User.findById({ _id }).populate("streams");
  if (!_id || typeof _id === undefined) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Currently, unable to fetch user profile",
    });
  }
  return res.status(200).json({
    status: "success",
    status_code: 100,
    data: user,
  });
};
export const newUser = async (req: Request, res: Response) => {
  const { email, fullname, password } = req.body;
  const userWithEmail = await User.findOne({ email });
  const userCheck = UserValidate.validate(req.body);
  const usersLen = (await User.find()).length + 1;
  try {
    if (userCheck.error) {
      const { details } = userCheck.error;
      const message = details.map((i) => i.message).join(",");
      return res.status(400).json({ message });
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
      const newUser = new User({
        email,
        fullname,
        password,
        user_id: usersLen,
      });
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
        return res.status(201).json({
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
// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!email || !password) {
    return res.status(403).json({
      status: "fail",
      status_code: 105,
      message: "Please fill all the fields",
    });
  }
  if (!user) {
    return res.status(400).json({
      status: "fail",
      status_code: 102,
      message: "Email or password is incorrect",
    });
  }
  try {
    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({
          status: "fail",
          status_code: 102,
          message: err,
        });
      }
      if (isMatch) {
        const token = jwt.sign({ user }, process.env.jwtSecret, {
          expiresIn: "12h",
        });
        return res.status(200).json({
          status: "Success",
          status_code: 100,
          token,
        });
      } else {
        return res.status(400).json({
          status: "fail",
          status_code: 102,
          message: "Email or password is incorrect",
        });
      }
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
// Auth facebook user
export const facebookAuthent = async (req: Request, res: Response) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.facebookAppId,
    redirect_uri: process.env.facebookAppRedir,
    scope: ["email", "user_friends"].join(","), // comma seperated string
    response_type: 200,
    auth_type: "rerequest",
    display: "popup",
  });
  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  try {
    console.log(stringifiedParams);
    res.redirect(facebookLoginUrl);
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
// Auth google user
export const googleCallback = async (req: Request, res: Response) => {
  try {
    passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        res.send("sas");
      };
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
// update user
export const updateUser = async (req: any, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      status: "fail",
      status_code: 105,
      message: "Null object detected",
    });
  }
  try {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      { upsert: true, new: true },
      (error, user) => {
        if (error) {
          return res.status(400).json({
            status: "fail",
            status_code: 105,
            message: error,
          });
        }
        return res.status(201).json({
          status: "updated",
          status_code: 100,
          data: { user },
        });
      }
    );
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
// update user password
export const updateUserPassword = async (req: any, res: Response) => {
  const { oldPassword, newPassword, newPassword2 } = req.body;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      status: "fail",
      status_code: 105,
      message: "Null object detected",
    });
  }
  try {
    User.findById(req.user._id, (error, user) => {
      if (!user) {
        return res.status(404).json({
          status: "fail",
          status_code: 105,
          message: "User not found",
        });
      }
      if (newPassword !== newPassword2) {
        return res.status(400).json({
          status: "fail",
          status_code: 102,
          message: "Password misMatch",
        });
      }
      if (user) {
        bcrypt.compare(oldPassword, user.password, (error, isMatch) => {
          if (error) {
            return res.status(400).json({
              status: "fail",
              status_code: 102,
              message: error,
            });
          }
          if (!isMatch) {
            return res.status(400).json({
              status: "Invalid password",
              status_code: 105,
              message: error,
            });
          } else {
            if (!newPassword || !newPassword2) {
              return res.status(400).json({
                status: "fail",
                status_code: 105,
                message: "New password fields is required",
              });
            }
            bcrypt.hash(newPassword, 8, async (error, hash) => {
              if (error) {
                return res.status(400).json({
                  status: "fail",
                  status_code: 102,
                  message: error,
                });
              }
              user.password = hash;
              await user.save();
              return res.status(201).json({
                status: "Success",
                status_code: 100,
                message: "User password updated",
              });
            });
          }
        });
      }
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
