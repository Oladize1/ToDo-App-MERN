import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './utils/connectDB.js'

import { taskRouter } from './routes/task.route.js'
import { userRouter } from './routes/user.route.js'

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.use('/api/tasks', taskRouter)
app.use('/api/auth', userRouter)

app.get('/test', (req, res) => {
    res.send('hello tested')
})

// Express example
app.get('/api/quote', async (req, res) => {
    const response = await fetch('https://zenquotes.io/api/random', {
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    res.json(data);
  });
  


const startApp = () => {
    connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startApp()