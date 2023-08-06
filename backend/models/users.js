const { Sequelize } = require('sequelize');
const db = require('../config/databases');

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
});

module.exports = Users;

// (async() => {
//     db.sync()
// })()