"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.user = exports.all = void 0;
const tslib_1 = require("tslib");
const User_1 = (0, tslib_1.__importDefault)(require("../../../models/User"));
const user_1 = require("../../../validation/user");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const all = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch all user",
    });
});
exports.all = all;
const user = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
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
});
exports.user = user;
const newUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { email, fullname, password, password2 } = req.body;
    const userWithEmail = yield User_1.default.findOne({ email });
    const userCheck = user_1.UserValidate.validate(req.body);
    const usersLen = (yield User_1.default.find()).length + 1;
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
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            const newUser = new User_1.default({ email, fullname, password, user_id: usersLen });
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
                return res.status(200).json({
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
//# sourceMappingURL=index.js.map