const express = require("express");
const { getTask, createTask } = require("../controllers/taskController");
const authMiddleware = require("../middilewares/authMiddleware");
const router = express.Router();



router.get("/tasks",authMiddleware, getTask);
router.post("/tasks", createTask);

module.exports = router;