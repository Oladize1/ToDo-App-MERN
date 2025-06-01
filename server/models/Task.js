import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null
    }
})

export const Task = mongoose.model('Task', taskSchema)

