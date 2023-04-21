const Sequelize = require("sequelize");

// Replace the values below with your own MySQL Workbench configuration
const sequelize = new Sequelize("myDatabase", "root", "9576", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
