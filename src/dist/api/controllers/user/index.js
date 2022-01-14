"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUser = exports.googleCallback = exports.facebookAuthent = exports.loginUser = exports.newUser = exports.user = exports.all = void 0;
const tslib_1 = require("tslib");
const User_1 = (0, tslib_1.__importDefault)(require("../../../models/User"));
const user_1 = require("../../../validation/user");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const queryString = (0, tslib_1.__importStar)(require("query-string"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const all = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch all user",
    });
});
exports.all = all;
const user = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { _id } = req === null || req === void 0 ? void 0 : req.user;
    const user = yield User_1.default.findById({ _id }).populate("streams");
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
});
exports.user = user;
const newUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { email, fullname, password } = req.body;
    const userWithEmail = yield User_1.default.findOne({ email });
    const userCheck = user_1.UserValidate.validate(req.body);
    const usersLen = (yield User_1.default.find()).length + 1;
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
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            const newUser = new User_1.default({
                email,
                fullname,
                password,
                user_id: usersLen,
            });
            bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
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
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.newUser = newUser;
// Login user
const loginUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
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
        bcryptjs_1.default.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(400).json({
                    status: "fail",
                    status_code: 102,
                    message: err,
                });
            }
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ user }, process.env.jwtSecret, {
                    expiresIn: "12h",
                });
                return res.status(200).json({
                    status: "Success",
                    status_code: 100,
                    token,
                });
            }
            else {
                return res.status(400).json({
                    status: "fail",
                    status_code: 102,
                    message: "Email or password is incorrect",
                });
            }
        });
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.loginUser = loginUser;
// Auth facebook user
const facebookAuthent = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const stringifiedParams = queryString.stringify({
        client_id: process.env.facebookAppId,
        redirect_uri: process.env.facebookAppRedir,
        scope: ["email", "user_friends"].join(","),
        response_type: 200,
        auth_type: "rerequest",
        display: "popup",
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    try {
        console.log(stringifiedParams);
        res.redirect(facebookLoginUrl);
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.facebookAuthent = facebookAuthent;
// Auth google user
const googleCallback = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("google", { failureRedirect: "/" }),
            (req, res) => {
                res.send("sas");
            };
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.googleCallback = googleCallback;
// update user
const updateUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return res.status(400).json({
            status: "fail",
            status_code: 105,
            message: "Null object detected",
        });
    }
    try {
        User_1.default.findByIdAndUpdate(req.user._id, {
            $set: req.body,
        }, { upsert: true, new: true }, (error, user) => {
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
        });
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.updateUser = updateUser;
// update user password
const updateUserPassword = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, newPassword2 } = req.body;
    if (!Object.keys(req.body).length) {
        return res.status(400).json({
            status: "fail",
            status_code: 105,
            message: "Null object detected",
        });
    }
    try {
        User_1.default.findById(req.user._id, (error, user) => {
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
                bcryptjs_1.default.compare(oldPassword, user.password, (error, isMatch) => {
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
                    }
                    else {
                        if (!newPassword || !newPassword2) {
                            return res.status(400).json({
                                status: "fail",
                                status_code: 105,
                                message: "New password fields is required",
                            });
                        }
                        bcryptjs_1.default.hash(newPassword, 8, (error, hash) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                            if (error) {
                                return res.status(400).json({
                                    status: "fail",
                                    status_code: 102,
                                    message: error,
                                });
                            }
                            user.password = hash;
                            yield user.save();
                            return res.status(201).json({
                                status: "Success",
                                status_code: 100,
                                message: "User password updated",
                            });
                        }));
                    }
                });
            }
        });
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: error,
            });
        }
    }
});
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=index.js.map