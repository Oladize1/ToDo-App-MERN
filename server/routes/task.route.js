import express from 'express'

import {
    getAllTasks,
    createTask,
    editTask,
    deleteTask,
    toggleCompleteTask
} from '../controllers/task.controller.js'

export const taskRouter = express.Router()

taskRouter.route('/').get(getAllTasks)
taskRouter.route('/create').post(createTask)
taskRouter.route('/:id').put(editTask).delete(deleteTask)
taskRouter.route('/:id/complete').patch(toggleCompleteTask)