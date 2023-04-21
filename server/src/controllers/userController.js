const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {};

// Create a new user
UserController.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with same email already exists
    const existingUser = await db.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await db.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    next(error);
  }
};

// Get a list of all users
UserController.getUsers = async (req, res, next) => {
  try {
    const users = await db.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get a specific user by ID
UserController.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
UserController.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Find the user to update
    const user = await db.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's attributes
    user.name = name;
    user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save changes
    await user.save();

    res.json({ message: 'User updated', user });
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
UserController.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the user to delete
    const user = await db.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await db.destroy();

    res.json({ message: 'User deleted', user });
  } catch (error) {
    next(error);
  }
};

module.exports = UserController;
