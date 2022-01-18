"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ensureAuth_1 = (0, tslib_1.__importDefault)(require("../../../middlewares/ensureAuth"));
const editor_1 = require("../../controllers/editor");
const multer_1 = (0, tslib_1.__importDefault)(require("../../../config/multer"));
const router = (0, express_1.Router)();
// upload video
router.post("/stream/transcribe/video/:video_id", multer_1.default.single("stream_video"), ensureAuth_1.default, editor_1.transcriptVideo);
exports.default = router;
//# sourceMappingURL=index.js.map