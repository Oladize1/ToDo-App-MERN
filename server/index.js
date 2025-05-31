import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './utils/connectDB.js'

const app = express()
const PORT = process.env.PORT

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