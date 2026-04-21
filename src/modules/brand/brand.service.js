import fileUploadSvc from "../../service/fileupload.service.js";
import { default as slugify } from "slugify";
import BrandModel from "./brand.model.js";

class BrandService {
  async transfromToBrand(req) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.uploadFile(req.file.path, "/brand");
      }

      payload.createdBy = req.loginUser._id;

      //slug
      payload.slug = slugify(payload.name, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async createData(payload) {
    try{
        const brand = new BrandModel(payload);
        return await brand.save();
    }catch(exception){
        throw exception
    }
  }

}

const brandSvc = new BrandService();
export default brandSvc;
