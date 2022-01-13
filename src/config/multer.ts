import multer from "multer";
// Multer configs
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});

const upload = multer({ storage });
export default upload;
