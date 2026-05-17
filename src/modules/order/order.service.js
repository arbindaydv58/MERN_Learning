import { OrderStatus } from "../../config/constant.js";
import { randomStringGenerate } from "../../utilities/helpers.js";
import OrderModel from "./order.model.js";

class OrderService {
  async placeOrder(loginUser, cartItems) {
    try {
      const order = {
        buyer: loginUser._id,
        orderCode: randomStringGenerate(10),
        subTotal: 0,
        discount: 0,
        vat: 0,
        total: 0,
        status: OrderStatus.PENDING,
        isPaid: false,
        createdBy: loginUser._id,
      };
      //voucher details
      cartItems.map((od) => {
        order.subTotal +=
          od.quantity * od.product.afterDiscount + od.deliveryCharge;
        od.unitPrice = od.product.afterDiscount;
        const odsubTotal = od.quantity * od.product.afterDiscount;
        od.total = odsubTotal + od.deliveryCharge;
      });

      order.vat = (order.subTotal - order.discount) * 0.13;
      order.total = order.subTotal - order.discount + order.vat;

      //order placement
      const orderObj = new OrderModel(order);
      return await orderObj.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const detail = await OrderModel.findOne(filter)
        .populate("buyer", ["_id", "name", "email", "role", "phone", "image"])
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
        ]);

      return detail;
    } catch (exception) {
      throw exception;
    }
  }

  async associateOrderToDetail(cartItems, orderObj) {
    try {
      let odUpdate = [];
      cartItems.map((od) => {
        od.order = orderObj._id;
        od.status = OrderStatus.CONFIRMED;
        odUpdate.push(od.save());
      });

      return await Promise.allSettled(odUpdate);
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15, sort = null }) {
    try {
      const skip = (page - 1) * limit;
      let sortObj = { createdAt: "desc" };
      if (sort) {
        //sort = createdAt_asc, amount_as
        const [field, dir] = sort.split("_");
        if (field && dir) {
          sortObj = {
            ...sortObj,
            [field]: dir,
          };
        }
      }

      const orders = await OrderModel.find(filter)
        .populate("buyer", ["_id", "name", "email", "role", "phone", "image"])
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
        .sort(sortObj)
        .skip(skip)
        .limit(limit);

      const count = await OrderModel.countDocuments(filter);

      return {
        data: orders,
        pagination: {
          page: page,
          limit: limit,
          total: count,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }
}

const orderSvc = new OrderService();

export default orderSvc;
