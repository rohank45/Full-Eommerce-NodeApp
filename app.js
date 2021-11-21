const express = require("express");
const app = express();

//temp check
app.set("view engine", "ejs");

//morgan middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

//middleware
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

//swagger docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
var swagger_path = path.resolve("./swagger.yaml");

const swaggerDocument = YAML.load(swagger_path);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//
//### import USERs routes

//home
const home = require("./routers/userRoutes/home");
app.use("/", home);

//register
const signup = require("./routers/userRoutes/signup");
app.use("/user", signup);

//rendering ejs file
app.get("/signuptest", (req, res) => {
  res.render("postForm");
});

//login
const login = require("./routers/userRoutes/login");
app.use("/user", login);

//logout
const logout = require("./routers/userRoutes/logout");
app.use("/user", logout);

//email sent forgot password
const forgotPassword = require("./routers/userRoutes/forgotPassword");
app.use("/user", forgotPassword);

//reset password
const resetPassword = require("./routers/userRoutes/resetPassword");
app.use("/user", resetPassword);

//profile page
const userDashboard = require("./routers/userRoutes/userDashboard");
app.use("/user", userDashboard);

//change password
const changePassword = require("./routers/userRoutes/changePassword");
app.use("/user", changePassword);

//update details
const updateUserDetails = require("./routers/userRoutes/updateUserDetails");
app.use("/user", updateUserDetails);

//ADMIN role
const adminAllUsers = require("./routers/userRoutes/adminAllUsers");
app.use("/user", adminAllUsers);

//MANAGER role
const adminGetUserData = require("./routers/userRoutes/adminGetUserData");
app.use("/user", adminGetUserData);

//MANAGER role
const managerAllUsers = require("./routers/userRoutes/managerAllUsers");
app.use("/user", managerAllUsers);

//
//### import PRODUCTs Routes

//add product
const addProduct = require("./routers/productRoutes/adminAddProduct");
app.use("/product", addProduct);

//get product
const getAllProducts = require("./routers/productRoutes/getAllProducts");
app.use("/product", getAllProducts);

//get product details
const getProductDetails = require("./routers/productRoutes/getProductDetails");
app.use("/product", getProductDetails);

//admin only update product details
const adminUpdateProduct = require("./routers/productRoutes/adminUpdateProduct");
app.use("/product", adminUpdateProduct);

//delete product
const adminDeleteProduct = require("./routers/productRoutes/adminDeleteProduct");
app.use("/product", adminDeleteProduct);

//add product review
const addReview = require("./routers/productRoutes/addReview");
app.use("/product", addReview);

//delete product review
const deleteReview = require("./routers/productRoutes/deleteReview");
app.use("/product", deleteReview);

//get only product reviews
const getOnlyReviews = require("./routers/productRoutes/getOnlyReviews");
app.use("/product", getOnlyReviews);

//
// ### PAYMENT - METHODS

//sending stripe key
const sendStripeKey = require("./routers/paymentRoutes/sendStripeKey");
app.use("/payment", sendStripeKey);

//sending razorpay key
const sendRazorPayKey = require("./routers/paymentRoutes/sendRazorPayKey");
app.use("/payment", sendRazorPayKey);

//payment using stripe key
const stripePayment = require("./routers/paymentRoutes/stripePayment");
app.use("/payment", stripePayment);

//payment using razorpay key
const razorpayPayment = require("./routers/paymentRoutes/razorpayPayment");
app.use("/payment", razorpayPayment);

//
// ### ORDER ROUTES

//creating order
const createOrder = require("./routers/orderRoutes/createOrder");
app.use("/order", createOrder);

//get order
const getOrder = require("./routers/orderRoutes/getOrder");
app.use("/order", getOrder);

//admin get all order
const adminGetAllOrders = require("./routers/orderRoutes/adminGetAllOrders");
app.use("/order", adminGetAllOrders);

//admin update order
const adminUpdateOrders = require("./routers/orderRoutes/adminUpdateOrders");
app.use("/order", adminUpdateOrders);

//admin delete order
const adminDeleteOrder = require("./routers/orderRoutes/adminDeleteOrder");
app.use("/order", adminDeleteOrder);

//export app
module.exports = app;
