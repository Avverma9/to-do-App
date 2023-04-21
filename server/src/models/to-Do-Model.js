const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configuration');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('done', 'pending', 'in progress', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Todo;
