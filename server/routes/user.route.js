import express from 'express'
import { loginRouter, registerRouter } from '../controllers/user.controller.js'
export const userRouter = express.Router()


userRouter.post('/login', loginRouter)
userRouter.post('/register', registerRouter)