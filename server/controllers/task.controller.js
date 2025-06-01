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
            text: task.trim()
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
        const { task, dueDate } = req.body
        const checkExitence = await Task.findById(id) 
        if(!checkExitence){
            return res.status(404).json({message: `No task with id ${id}`})
        }
        console.log(req.body);
        
        if (!task || task.trim() === '') {
            return res.status(400).json({message: "task field cannot be empty"})
        }
        const editedTask = {
            text: task,
            completed: false
        }
        if (typeof dueDate !== 'undefined' && dueDate !== '') {
            editedTask.dueDate = dueDate
        }
        const updatedTask = await Task.findByIdAndUpdate(id, editedTask, {new: true})
        res.status(200).json(updatedTask)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error editing task"})
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const checkExitence = await Task.findById(id)
        if(!checkExitence){
            return res.status(404).json({mesage: `task with id ${id} not found`})
        }
        await Task.findByIdAndDelete(id)
        res.status(200).json({message: "task deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error deleting post"})
    }
}
