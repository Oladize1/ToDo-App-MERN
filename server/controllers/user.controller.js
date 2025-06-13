import {User} from '../models/User.js'
import bcryptjs from 'bcryptjs'

import { generateToken } from '../utils/generateToken.js'


export const loginRouter = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: 'invalid username or password'})
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).json({message: 'Invalid credentials'})
        }
        const decodedPassword = bcryptjs.compareSync(password, user.password)
        if(!decodedPassword){
            return res.status(404).json({message: "invalid credentials"})
        }
        const token = generateToken(user._id)
        res.status(200).json({email: user.email, username: user.username, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error login', error})
    }
}

export const registerRouter = async (req, res) => {
    try {
        const {email, username, password} = req.body
        if (!username.trim() || !password.trim() || !email.trim()) {
            return res.status(400).json({message: 'invalid email, username or password'})
        }
        
        const checkExistence = await User.findOne({email: email})
        if(checkExistence){
            return res.status(400).json({message: 'user already exist'})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username : username.trim(),
            email: email.trim(),
            password: hashPassword,
        })
        await newUser.save()
        const token = generateToken(newUser._id)
        res.status(201).json({username: newUser.username, email: newUser.email, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error during registration', error})
    }
}