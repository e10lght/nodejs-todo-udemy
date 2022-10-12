const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "名前は必要です"],
            trim: true,
            maxlength: [20, "20文字まで"]
        },
        completed: {
            type: Boolean,
            default: false
        },
    }
);

module.exports = mongoose.model("Task", TaskSchema);