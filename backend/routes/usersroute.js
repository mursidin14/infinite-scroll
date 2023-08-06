const express = require('express');
const { getAllUsers } = require('../controller/usercontroll');
const route = express.Router();

route.get('/users', getAllUsers);

module.exports = route;