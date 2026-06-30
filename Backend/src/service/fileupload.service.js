import CloudinaryService from "./cloudinary.service.js";

class FileUploadService {
  uploadSvc;
  constructor(cloudinarySvc) {
    this.uploadSvc = cloudinarySvc;
  }
  async uploadFile(filepath, dir = "/") {
    try {
      return await this.uploadSvc.fileupload(filepath, dir);
    } catch (exception) {
      throw exception;
    }
  }
}

const fileUploadSvc = new FileUploadService(new CloudinaryService());

export default fileUploadSvc;
