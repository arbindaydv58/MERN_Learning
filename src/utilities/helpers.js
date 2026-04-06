import fs from "fs";

export const deleteFile = async (filepath) => {
  if (fs.existsSync(filepath)) {
    return fs.unlinkSync(filepath);
  }
  return false;
};

export const randomStringGenerate = (length = 100) => {
  const chars =
    "0123456789abcdefghijklemnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = chars.length;
  let randomStr = "";
  for (let i = 1; i <= length; i++) {
    const posn = Math.ceil(Math.random() * (len - 1));
    randomStr += chars[posn];
  }
  return randomStr;
};

export default { deleteFile, randomStringGenerate };
