import express from "express";

const app = express();

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import path from "path";
var swagger_path = path.resolve("./swagger.yaml");

const swaggerDocument = YAML.load(swagger_path);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).send("<h1>hello, home page here</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started...");
});
