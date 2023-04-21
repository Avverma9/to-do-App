const db = require('../models/to-Do-Model');
const { Op } = require('sequelize');

const Todo = db.Todo;

// Create new to-do item
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all to-do items
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single to-do item by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id }
    });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a to-do item by ID
exports.updateTodo = async (req, res) => {
  try {
    const [rows, [updatedTodo]] = await Todo.update(req.body, {
      returning: true,
      where: { id: req.params.id }
    });
    if (rows > 0) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a to-do item by ID
exports.deleteTodo = async (req, res) => {
  try {
    const rows = await Todo.destroy({
      where: { id: req.params.id }
    });
    if (rows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all to-do items by status
exports.getTodosByStatus = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { status: req.query.status }
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all to-do items by search query
exports.searchTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.q}%` } },
          { description: { [Op.like]: `%${req.query.q}%` } }
        ]
      }
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
