import { OrderStatus, Status } from "../../config/constant.js";
import productSvc from "../products/product.service.js";
import orderDetailSvc from "./order-detail.service.js";

class OrderDetailController {
  async addToCart(req, res, next) {
    try {
      const { product, quantity } = req.body;
      const loginUser = req.loginUser;

      const productDetail = await productSvc.getSingleRowByFilter({
        _id: product,
        status: Status.ACTIVE,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product Does Not Exits",
          status: "PRODUCT_NOT_FOUND",
        };
      }

      //product found
      const cirrentItem = orderDetailSvc.transformToCart(
        quantity,
        loginUser,
        productDetail,
      );

      //existing card search
      let existingCart = await orderDetailSvc.getSingleRowByFilter({
        order: { $eq: null },
        buyer: loginUser._id,
        product: productDetail._id,
        status: OrderStatus.PENDING,
      });

      if (existingCart) {
        //update cart
        existingCart = await orderDetailSvc.updateCurrentCartItem(
          existingCart,
          productDetail,
          +existingCart.quantity + quantity,
        );
      } else {
        //creating cart
        existingCart = await orderDetailSvc.createCart(cirrentItem);
      }

      res.json({
        data: existingCart,
        message: "Cart Item updated sucessfully",
        status: "ADD_UPDATE_CART_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listMyCartItem(req, res, next) {
    try {
      let filter = {
        order: { $eq: null },
        buyer: req.loginUser._id,
        status: OrderStatus.PENDING,
      };

      const { data, pagination } = await orderDetailSvc.getAllRowsByFilter(
        filter,
        req.query,
      );
      res.json({
        data: data,
        message: "your cart items",
        status: "YOUR_CART_ITEMS",
        options: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { quantity, product } = req.body;
      const loginUser = req.loginUser;

      //product detail
      const productDetail = await productSvc.getSingleRowByFilter({
        _id: product,
        status: Status.ACTIVE,
      });

      if (!productDetail) {
        throw { code: 422, message: "Product not found", status: "NOT_FOUND" };
      }

      //cart detail fetch
      let cardDetail = await orderDetailSvc.getSingleRowByFilter({
        order: { $eq: null },
        buyer: loginUser._id,
        product: productDetail._id,
        status: OrderStatus.PENDING,
      });

      if (!cardDetail) {
        throw {
          code: 422,
          message: "card does not exists",
          status: "CART_ITEM_NOT_FOUND",
        };
      }

      if (+cardDetail.quantity === +quantity || +quantity === 0) {
        //delete from cart
        await orderDetailSvc.deleteSingleCartByFilter(cardDetail._id);
      } else if (cardDetail.quantity < quantity) {
        throw {
          code: 400,
          details: { quantity: "Greater than existing quantity" },
          messahe: "Cart Item is less then requested",
          status: "Validation_Failed",
        };
      } else {
        cardDetail = await orderDetailSvc.updateCurrentCartItem(
          cardDetail,
          productDetail,
          +cardDetail.quantity + quantity,
        );
      }

      res.json({
        data: cardDetail,
        message: "Cart Item updated sucessfully",
        status: "REMOVE_UPDATE_CART_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const orderDetailCtrl = new OrderDetailController();
export default orderDetailCtrl;
