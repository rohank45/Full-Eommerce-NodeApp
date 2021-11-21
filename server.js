const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

//databse connected
const dbConn = require("./config/database");
dbConn();

//cloudinary setup
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRETE,
});

//listen server
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}...`);
});
