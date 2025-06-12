import { Task } from '../models/Task.js'
import { User } from '../models/User.js'

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
        const { task, dueDate } = req.body
        console.log(task, dueDate)
        if (!task || task.trim() === '') {
            return res.status(400).json("Task cannot be empty")
        }
        const newTask = new Task({
            text: task.trim(),
            ...(dueDate && {dueDate})
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
        const { id } = req.params
        const { task, dueDate, completed } = req.body
        const checkExitence = await Task.findById(id) 
        if(!checkExitence){
            return res.status(404).json({message: `No task with id ${id}`})
        }
        
        if (!task || task.trim() === '') {
            return res.status(400).json({message: "task field cannot be empty"})
        }
        const editedTask = {
            text: task.trim()
        }
        if (typeof dueDate !== 'undefined' && dueDate !== '') {
            editedTask.dueDate = dueDate
        }
        if (typeof completed === 'boolean') {
            editedTask.completed = completed
        }
        const updatedTask = await Task.findByIdAndUpdate(id, editedTask, {new: true})
        res.status(200).json(updatedTask)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error editing task"})
    }
}

export const toggleCompleteTask = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id);
        const checkExistence = await Task.findById(id)
        if (!checkExistence) {
            return res.status(404).json({message: `No task with id ${id}`})
        }
        const toggleCompletion = await Task.findByIdAndUpdate(id, {completed : !checkExistence.completed}, {new: true})
        res.status(200).json(toggleCompletion)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error completing task'})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const checkExitence = await Task.findById(id)
        if(!checkExitence){
            return res.status(404).json({message: `task with id ${id} not found`})
        }
        await Task.findByIdAndDelete(id)
        res.status(200).json({message: "task deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error deleting post"})
    }
}
