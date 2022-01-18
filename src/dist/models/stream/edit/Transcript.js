"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TranscribeVideo = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
//Create a Model.
const TranscribeModel = (0, mongoose_1.model)("transcribe_video", TranscribeVideo);
exports.default = TranscribeModel;
//# sourceMappingURL=Transcript.js.map