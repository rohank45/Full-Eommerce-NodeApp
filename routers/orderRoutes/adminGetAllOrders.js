const express = require("express");
const customRole = require("../../middlewares/customRole");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const Order = require("../../models/orderModel");

router.get(
  "/admin/getOrder",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      const order = await Order.find();

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
