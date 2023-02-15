const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
exports.getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.find({ user: req.user.id }).sort({
        created_at: -1,
    });
    res.send({
        status: "success",
        results: tasks.length,
        data: {
            tasks,
        },
    });
});

exports.createTask = catchAsync(async (req, res, next) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id,
    });
    res.status(201).json({
        status: "success",
        data: {
            task: newTask,
        },
    });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return next(new AppError("No task found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        {
            new: true,
        }
    );
    if (!task) {
        return next(new AppError("No task found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: task,
    });
});
