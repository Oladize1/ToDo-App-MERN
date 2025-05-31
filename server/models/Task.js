import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    text: String,
    completed: Boolean,
    dueDate: Date
})

export const Task = mongoose.model('Task', taskSchema)

