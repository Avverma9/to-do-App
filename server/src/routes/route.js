const express = require("express");
const router = express.Router();
const taskController = require("../controllers/toDoController");
const userController= require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.post("/login",userController.login);
router.post("/signup", userController.signup);

// Private routes (require authentication)
router.use(authMiddleware);
router.get("/tasks", taskController.getAllTodos);
router.get("/tasks/:id", taskController.getTodoById);
router.post("/tasks", taskController.createTodo);
router.put("/tasks/:id", taskController.updateTodo);
router.delete("/tasks/:id", taskController.deleteTodo);

module.exports = router;
