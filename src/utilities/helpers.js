import fs from "fs";

const deleteFile = async (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.unlinkSync(filepath);
  }
  return false;
};

export default deleteFile;
