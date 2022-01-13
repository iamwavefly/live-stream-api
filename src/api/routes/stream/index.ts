import { Router } from "express";
import ensureAuth from "../../../middlewares/ensureAuth";
import {
  uploadVideo,
  newStream,
  deleteStream,
  deleteVideo,
  allStream,
} from "../../controllers/stream/";
import upload from "../../../config/multer";

const router = Router();
// upload video
router.post(
  "/upload/video",
  upload.single("stream_video"),
  ensureAuth,
  uploadVideo
);
// upload video
router.delete("/delete/video/:video_id", ensureAuth, deleteVideo);
// new stream
router.post("/new/:video_id", ensureAuth, newStream);
// get streams
router.get(
  "/all/filterable/:sort_by?/:limit?/:page?/:stream_id?",
  ensureAuth,
  allStream
);
// delete stream
router.delete("/delete/:stream_id", ensureAuth, deleteStream);

export default router;
