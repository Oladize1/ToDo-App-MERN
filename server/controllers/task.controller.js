import {Task} from '../models/Task.js'

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: -1 })
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error fetching all tasks"})
    }
}

export const createTask = async (req, res) => {
    try {
        const { task } = req.body
        if (!task || typeof task !== 'String' || task.trim() === '') {
            return res.status(400).json("Task cannot be empty")
        }
        const newTask = new Task({
            text: task.trim(),
            completed: false
        })
        await newTask.save()
        res.status(201).json(newTask)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error creating task"})
    }
}

export const editTask = (req, res) => {
    console.log('edit task')
}

export const deleteTask = (req, res) => {
    console.log("delete task")
}
