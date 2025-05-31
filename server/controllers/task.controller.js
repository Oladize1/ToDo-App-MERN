import {Task} from '../models/Task.js'

export const getAllTasks = (req, res) => {
    console.log('get all tasks')
    res.send('get all task')
}

export const createTask = (req, res) => {
    try {
        const { task } = req.body
        if (task === '') {
            return res.status(400).json("Task cannot be empty")
        }
        const newTask = new Task({
            text: task,
            completed: false
        })
        newTask.save()
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
