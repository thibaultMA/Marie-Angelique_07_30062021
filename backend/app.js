const express = require("express");
var bodyParser = require("body-parser");
require('dotenv').config()
const userRoutes = require("./routes/users");
const msgRoutes = require("./routes/message");
const testRoutes = require("./routes/test");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/message", msgRoutes);
app.use("/test", testRoutes);

module.exports = app;
