const express = require("express");
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const routers = express.Router();

routers
    .route("/")
    .get(authController.protect, taskController.getAllTasks)
    .post(authController.protect, taskController.createTask);

routers
    .route("/:id")
    .patch(authController.protect, taskController.updateTask)
    .delete(authController.protect, taskController.deleteTask);

module.exports = routers;
