const mongoose = require("mongoose");

const dbConn = () => {
  const { DB_URL } = process.env;

  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConn;
