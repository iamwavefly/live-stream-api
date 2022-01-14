"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
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
        required: true,
    },
    user_id: {
        type: Number,
    },
    streams: [{ type: mongoose_1.Types.ObjectId, ref: "Stream" }],
    linked_accounts: {},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//Create a Model.
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map