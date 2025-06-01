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
        if (!task || task.trim() === '') {
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

export const editTask = async (req, res) => {
    try {
        const {id} = req.params
        const checkExitence = Task.findById(id)
        if(!checkExitence){
            return res.status(404).json({message: `No task with id ${id}`})
        }
        res.status(200).json(id)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error editing task"})
    }
}

export const deleteTask = (req, res) => {
    console.log("delete task")
}
