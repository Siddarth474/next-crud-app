import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";

const getGenerateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const token = user.generateToken();

        await user.save({validateBeforeSave: false});

        return {token};

    } catch (error) {
        throw error;
    }
}

export const POST = async (request) => {
    try {
        await connectDB();
        const {email, password} = await request.json();
    
        if(!email || !password) {
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }
    
        const user = await User.findOne({email});
    
        if(!user) {
            return NextResponse.json({error: 'User not exist'}, {status: 400});
        }
    
        const validatePassword = await user.isPasswordCorrect(password);
    
        if(!validatePassword) {
            return NextResponse.json({error: 'Password is incorrect'}, {status: 400});
        }

        const {token} = await getGenerateToken(user._id);

        const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

        const response = NextResponse.json({
            message: 'Logged In Successfully',
            success: true,
            loggedInUser
        }, {status: 200});

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        }

        response.cookies.set('token', token, options);

        return response;

    } catch (error) {
        console.log('Something went wrong! ', error);
        return NextResponse.json(
            {error: error.message}, 
            {status: 500}
        )
    }
}