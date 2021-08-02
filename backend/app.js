const express = require('express')
require('dotenv').config()
const app = express()
const helmet = require("helmet");
var bodyParser = require("body-parser");

const db = require('./models')

const userRoute = require('./router/user')
const messageRoute = require('./router/message')



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
app.use(helmet());
// routes
app.use('/users',userRoute)
app.use('/message',messageRoute)

db.sequelize.sync().then()
module.exports = app;