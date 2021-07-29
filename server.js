// requires
const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// setteres
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call mongoose
// eslint-disable-next-line import/no-unresolved
require('./src/model')(mongoose);

// call route
// eslint-disable-next-line import/no-unresolved
require('./src/route/route')(app);

// listen at 8081
// eslint-disable-next-line no-console
app.listen(process.env.PORT || 8081, () => console.log(`Server is hosted at 127.0.0.1:${process.env.PORT}` || 8081));
