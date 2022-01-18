import { Router } from "express";
import ensureAuth from "../../../middlewares/ensureAuth";
import { transcriptVideo } from "../../controllers/editor";

import upload from "../../../config/multer";

const router = Router();
// upload video
router.post(
  "/stream/transcribe/video/:video_id",
  upload.single("stream_video"),
  ensureAuth,
  transcriptVideo
);

export default router;
