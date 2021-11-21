const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const Order = require("../../models/orderModel");
const customRole = require("../../middlewares/customRole");
const productModel = require("../../models/productModel");

router.put(
  "/admin/updateOrder/:id",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      const order = await Order.findOne(req.params.id);

      if (order.orderStatus === "delivered") {
        return next(new Error("Order already marked as a delivered"));
      }

      if (order.orderStatus === "processing") {
        order.orderItems.forEach(async (prod) => {
          await updateStockOfProduct(prod.product, prod.quantity);
        });

        order.orderStatus = req.body.orderStatus;
      }

      await order.save();

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;

async function updateStockOfProduct(productId, quantity) {
  const product = await productModel.findById(productId);

  if (product.stock === 0) {
    product.stock = product.stock - quantity;
  }
  await product.save({ ValidateBeforeSave: false });
}
