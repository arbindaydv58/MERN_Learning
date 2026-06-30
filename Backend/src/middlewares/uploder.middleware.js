import fs from "fs";
import multer from "multer";

const uploader = (type = "image") => {
  const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let dirPath = "./public/uploads";
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  let allowedExts = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "jfif"];
  let maxfileSize = 3 * 1024 * 1024;

  if (type === "doc") {
    allowedExts = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "jfif"];
    maxfileSize = 3 * 1024 * 1024;
  }

  const validateFileType = (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    if (allowedExts.includes(fileExt.toLowerCase())) {
      cb(null, true);
    } else {
      cb({
        code: 422,
        message: "File formate not supported...",
        status: "UNSUPPORTED_FILE_FORMAT_ERR",
      });
    }
  };

  return multer({
    storage: mystorage,
    fileFilter: validateFileType,
    limits: {
      fileSize: maxfileSize,
    },
  });
};

export default uploader;
