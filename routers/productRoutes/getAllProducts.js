const express = require("express");
const router = express.Router();
const Product = require("../../models/productModel");
const WhereClause = require("../../utils/whereClause");
const userAuth = require("../../middlewares/userAuth");
const customRole = require("../../middlewares/customRole");

router.get(
  "/getAllProducts",
  userAuth,
  customRole("admin"),
  async (req, res) => {
    try {
      const resultPerPage = 6;

      const totalCountProducts = await Product.countDocuments();

      const productsObj = new WhereClause(Product.find(), req.query)
        .search()
        .filter();

      let products = await productsObj.base.clone();

      const filteredProductsNumber = products.length;

      //products.limit().skip()
      productsObj.pager(resultPerPage);
      products = await productsObj.base;

      res.status(201).json({
        succeess: true,
        products,
        totalCountProducts,
        filteredProductsNumber,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
