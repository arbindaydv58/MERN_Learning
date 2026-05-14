import { OrderStatus } from "../../config/constant.js";
import orderDetailSvc from "../order-details/order-detail.service.js";
import orderSvc from "./order.service.js";
import { UserRole } from "../../config/constant.js";

class OrderController {
  async checkout(req, res, next) {
    try {
      const { cartIds } = req.body;
      const loginUser = req.loginUser;

      //fetch cartItems
      const { data: cartItems } = await orderDetailSvc.getAllRowsByFilter(
        {
          order: { $eq: null },
          buyer: loginUser._id,
          status: OrderStatus.PENDING,
          _id: { $in: cartIds },
        },
        { page: 1, limit: cartIds.length },
      );

      //a. if cartitem not found
      if (!cartItems || cartItems.length <= 0) {
        throw {
          code: 422,
          message: "Cart not found",
          status: "CART_NOT_FOUND",
        };
      } else if (cartItems.length < cartIds.length) {
        //b. no of cart items are not same requested
        throw {
          code: 422,
          message:
            "Some of the cart items does not belong to the user or already checked out ",
          status: "CART_ITEM_NOT_FOUND",
        };
      } else {
        //c. car found
        const orderObj = await orderSvc.placeOrder(loginUser, cartItems);

        //update order details
        await orderSvc.associateOrderToDetail(cartItems, orderObj);

        //TODO: notify to admin ,seller and customer
        //admin all detail,customer
        //for seller send only of his product

        res.json({
          data: orderObj,
          message: "Order placed successfully",
          status: "ORDER_PLACED",
          options: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  }

  async ListAllOrders(req, res, next) {
    try {
      const loginUser = req.loginUser;

      let filter = {};

      if (req.query.search) {
        filter = {
          $or: [
            { orderCode: new RegExp(req.query.search, "i") },
            { createdAt: new RegExp(req.query.search, "i") },
          ],
        };
      }

      if (loginUser.role === UserRole.ADMIN) {
        const { data, pagination } = await orderSvc.getAllRowsByFilter(
          filter,
          req.query,
        );
        res.json({
          data: data,
          message: "Order List",
          status: "ORDER_LIST",
          options: { pagination },
        });
      } else if (loginUser.role === UserRole.CUSTOMER) {
        filter = {
          ...filter,
          buyer: loginUser._id,
        };

        const { data, pagination } = await orderSvc.getAllRowsByFilter(
          filter,
          req.query,
        );
        res.json({
          data: data,
          message: "Order List",
          status: "ORDER_LIST",
          options: { pagination },
        });
      } else if (loginUser.role === UserRole.SELLER) {
        filter = {
          ...filter,
          seller: loginUser._id,
        };

        if (req.query.status) {
          filter = {
            ...filter,
            status: req.query.status,
          };
        }

        const { data, pagination } = await orderDetailSvc.getAllRowsByFilter(
          filter,
          req.query,
        );
        res.json({
          data: data,
          message: "Order List",
          status: "ORDER_LIST",
          options: { pagination },
        });
      }
    } catch (exception) {
      next(exception);
    }
  }

  async getOrderDetail(req, res, next) {
    try {
      const loginUser = req.loginUser;
      const { orderId } = req.params;

      let filter = {
        order: orderId,
      };

      if (loginUser.role === UserRole.CUSTOMER) {
        filter = {
          ...filter,
          buyer: loginUser._id,
        };
      }
      const { data, pagination } = await orderDetailSvc.getAllRowsByFilter(
        filter,
        req.query,
      );
      res.json({
        data: data,
        message: "Order Detail",
        status: "ORDER_DETAIL",
        options: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const orderCtrl = new OrderController();
export default orderCtrl;
