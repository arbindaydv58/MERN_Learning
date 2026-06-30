import { OrderStatus } from "../../config/constant.js";
import OrderDetailModel from "./order-detail.model.js";


class OrderDetailService {
  transformToCart(quantity, loginUser, productDetail) {
    return {
      order: null,
      buyer: loginUser._id,
      product: productDetail._id,
      quantity: quantity,
      unitPrice: productDetail.afterDiscount,
      subTotal: productDetail.afterDiscount * quantity,
      deliveryCharge: 10000,
      total: productDetail.afterDiscount * quantity + 10000,
      seller: productDetail?.seller?._id,
      status: OrderStatus.PENDING,
      createdBy: loginUser._id,
    };
  }

  async getSingleRowByFilter(filter) {
    try {
      const orderDetail = await OrderDetailModel.findOne(filter)
        .populate("order", [
          "_id",
          "orderCode",
          "subTotal",
          "vat",
          "discount",
          "total",
          "status",
          "isPaid",
        ])
        .populate("buyer", ["_id", "name", "email", "role", "phone", "image"])
        .populate("seller", ["_id", "name", "email", "role", "phone", "image"])
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("product", [
          "_id",
          "name",
          "slug",
          "afterDiscount",
          "seller",
          "stock",
        ]);

      return orderDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15 }) {
    try {
      const skip = (page - 1) * limit;
      const data = await OrderDetailModel.find(filter)
        .populate("order", [
          "_id",
          "orderCode",
          "subTotal",
          "vat",
          "discount",
          "total",
          "status",
          "isPaid",
        ])
        .populate("buyer", ["_id", "name", "email", "role", "phone", "image"])
        .populate("seller", ["_id", "name", "email", "role", "phone", "image"])
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("product", [
          "_id",
          "name",
          "slug",
          "afterDiscount",
          "seller",
          "stock",
        ])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);

      const count = await OrderDetailModel.countDocuments(filter);
      return {
        data: data,
        paggination: {
          page: +page,
          limit: +limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async createCart(data) {
    try {
      const orderDetail = new OrderDetailModel(data);
      return await orderDetail.save();
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleCartByFilter(filter, data) {
    try {
      const update = new OrderDetailModel.findByIdAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return await update;
    } catch (exception) {
      throw exception;
    }
  }

  async updateCurrentCartItem(existingCart, productDetail, quantity) {
    existingCart.quantity = quantity;
    existingCart.unitPrice = productDetail.afterDiscount;
    existingCart.subTotal = existingCart.quantity * productDetail.afterDiscount;
    existingCart.total = existingCart.subTotal + 10000;

    return await existingCart.save();
  }

  async deleteSingleCartByFilter(filter) {
    try {
      const deletedCart = await OrderDetailModel.findByIdAndDelete(filter);
      return deletedCart;
    } catch (exception) {
      throw exception;
    }
  }
}

const orderDetailSvc = new OrderDetailService();
export default orderDetailSvc;
