import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    task:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

export const User = mongoose.model('User', userSchema)