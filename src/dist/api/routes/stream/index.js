"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ensureAuth_1 = (0, tslib_1.__importDefault)(require("../../../middlewares/ensureAuth"));
const stream_1 = require("../../controllers/stream/");
const multer_1 = (0, tslib_1.__importDefault)(require("../../../config/multer"));
const router = (0, express_1.Router)();
// upload video
router.post("/upload/video", multer_1.default.single("stream_video"), ensureAuth_1.default, stream_1.uploadVideo);
// upload video
router.delete("/delete/video/:video_id", ensureAuth_1.default, stream_1.deleteVideo);
// new stream
router.post("/new/:video_id", ensureAuth_1.default, stream_1.newStream);
// get video
router.get("/video/all/filterable", ensureAuth_1.default, stream_1.allVideo);
// get streams
router.get("/all/filterable", ensureAuth_1.default, stream_1.allStream);
// delete stream
router.delete("/delete/:stream_id", ensureAuth_1.default, stream_1.deleteStream);
exports.default = router;
//# sourceMappingURL=index.js.map