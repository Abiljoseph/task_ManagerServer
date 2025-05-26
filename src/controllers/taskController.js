const Task = require("../models/taskModel.js");

exports.getTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id }); // Fetch tasks for the logged-in user
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
 
exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, dueDate, tags, attachments } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title, description, and projectId are required",
            });
        }

        // Create a new task
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            tags,
            attachments,
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create task",
            error: error.message,
        });
    }
};

exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const task = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: error.message,
        });
    }
};

exports.searchTaskByName = async (req, res) => {
    try {
        const { searchQuery } = req.query;

        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        const tasks = await Task.find({
            title: { $regex: searchQuery, $options: "i" },
        });

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to search tasks",
            error: error.message,
        });
    }
};

// Get tasks by priority
exports.getTasksByPriority = async (req, res) => {
    try {
        const { priority } = req.query;
        if (!priority) {
            return res.status(400).json({
                success: false,
                message: "Priority is required",
            });
        }
        const tasks = await Task.find({ priority });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks by priority",
            error: error.message,
        });
    }
};

// Get overdue tasks (dueDate in the past and not completed)
exports.getOverdueTasks = async (req, res) => {
    try {
        const now = new Date();
        const tasks = await Task.find({ dueDate: { $lt: now }, completed: false });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch overdue tasks",
            error: error.message,
        });
    }
};

// Get tasks by tag
exports.getTasksByTag = async (req, res) => {
    try {
        const { tag } = req.query;
        if (!tag) {
            return res.status(400).json({
                success: false,
                message: "Tag is required",
            });
        }
        const tasks = await Task.find({ tags: tag });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks by tag",
            error: error.message,
        });
    }
};

// Get tasks assigned to a specific user
exports.getTasksByAssignee = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const tasks = await Task.find({ assignedTo: userId });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks by assignee",
            error: error.message,
        });
    }
};

// Get tasks due within a date range
exports.getTasksByDateRange = async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({
                success: false,
                message: "Start and end dates are required",
            });
        }
        const tasks = await Task.find({
            dueDate: { $gte: new Date(start), $lte: new Date(end) },
        });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks by date range",
            error: error.message,
        });
    }
};
