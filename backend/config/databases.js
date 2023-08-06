const { Sequelize } = require('sequelize');

const db = new Sequelize('db_infinite', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

db.authenticate()
.then(() => {
    console.log('databases connected successfully...');
}).catch((err) => {
    console.log('databases error', err);
})

module.exports = db;