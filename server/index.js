import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './utils/connectDB.js'

import { taskRouter } from './routes/task.route.js'

const app = express()
const PORT = process.env.PORT

app.use(urlencoded({extended: true}))

app.use('/api/tasks', taskRouter)

app.get('/test', (req, res) => {
    res.send('hello tested')
})


const startApp = () => {
    connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startApp()