const express = require("express");
const { getTask, createTask, editTask, deleteTask, searchTaskByName } = require("../controllers/taskController");
const authMiddleware = require("../middilewares/authMiddleware");
const router = express.Router();



router.get("/tasks",authMiddleware, getTask);
router.post("/tasks",authMiddleware, createTask);
router.put("/tasks/:id", authMiddleware, editTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);
router.get("/tasks/search", authMiddleware, searchTaskByName);

module.exports = router;