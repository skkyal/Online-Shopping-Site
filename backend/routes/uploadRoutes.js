import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/uploads`);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileTypes(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  //console.log(extName, mimeType, file);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("Images Only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log(__dirname);
  res.send(`/uploads${req.file.path.split("uploads")[1]}`);
});

export default router;
