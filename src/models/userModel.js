import mongoose, { Schema } from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
        }, 
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('users', userSchema);