//requires
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

//setteres
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//call mongoose
require('./src/model')(mongoose);

//call route
require('./src/route/route')(app);

//listen at 8081
app.listen(process.env.PORT || 8081, () => console.log("Server is hosted at 127.0.0.1:" + process.env.PORT || 8081));