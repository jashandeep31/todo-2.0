const moongose = require("mongoose");

const taskSchema = new moongose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Task = moongose.model("Task", taskSchema);
module.exports = Task;
