const express = require("express")
const router = express.Router()
const { createUser, getUser, userLogin, updateUser } = require("../controller/userController")

const { createTask, getTask, updateTask, deleteTask } = require("../controller/TodoController")

/////////////////////////////////////////////
router.post("/user", createUser)
router.get("/user/:id", getUser)
router.post("/userLogin", userLogin)

router.put("/user/:id", updateUser)


router.post("/task/:userId", createTask)
router.get("/task/:userId", getTask)             
router.put("/task/:userId/:id", updateTask)
router.delete("/task/:userId/:id", deleteTask)

module.exports = router