const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const Order = require("../../models/orderModel");
const customRole = require("../../middlewares/customRole");

router.delete(
  "/admin/updateOrder/:id",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      await order.remove();

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      return next(new Error(error));
    }
  }
);

module.exports = router;
