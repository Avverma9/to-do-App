const db = require('../models/toDo');
const { Op } = require('sequelize');

const todoController = {};

// CREATE
todoController.create = async (req, res, next) => {
  try {
    const { task, status } = req.body;
    const userId = req.user.id;

    const newTodo = await db.create({ task, status, userId });

    res.status(201).json({ message: 'Todo created', todo: newTodo });
  } catch (error) {
    next(error);
  }
};

// READ
todoController.getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const todos = await db.Todo.findAll({ where: { userId } });

    res.json({ todos });
  } catch (error) {
    next(error);
  }
};

todoController.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const todo = await db.findOne({ where: { id, userId } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    next(error);
  }
};

// UPDATE
todoController.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const todo = await db.findOne({ where: { id, userId } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { task, status } = req.body;

    await db.Todo.update({ task, status }, { where: { id, userId } });

    res.json({ message: 'Todo updated' });
  } catch (error) {
    next(error);
  }
};

// DELETE
todoController.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const todo = await db.findOne({ where: { id, userId } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await db.Todo.destroy({ where: { id, userId } });

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
};

// SEARCH
todoController.search = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = req.query.q;

    const todos = await db.findAll({
      where: {
        userId,
        [Op.or]: [
          { task: { [Op.substring]: query } },
          { status: { [Op.substring]: query } },
        ],
      },
    });

    res.json({ todos });
  } catch (error) {
    next(error);
  }
};

module.exports = todoController;
