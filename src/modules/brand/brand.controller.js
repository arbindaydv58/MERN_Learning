import brandSvc from "./brand.service.js";

class BrandController {
  async createBrand(req, res, next) {
    try {
      const payload = await brandSvc.transfromToBrand(req);
      const brand = await brandSvc.createData(payload);

      res.json({
        data: brand,
        message: "Brand Created",
        status: "BRAND_CREATED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const brandCtrl = new BrandController();
export default brandCtrl;
