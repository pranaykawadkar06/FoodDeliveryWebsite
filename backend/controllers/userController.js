import User from "../models/userModel.js"; 
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// login user
const loginUser = async(req, res) => {

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            console.log("User doesn't  exist");
            return res.json({
                success: false,
                message: "User doesn't  exist"
            })
        }

        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            console.log("Invalid Credentials");
            return res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error"
        })
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user 
const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking is user already exists
        const exists = await User.findOne({email});
        if(exists){
            return res.json({
                success: false,
                message: "User already exists"
            })
        }
        // validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if(password.length < 8) {
            return res.json({
                success: false,
                message: "please enter a strong password of minimum 8 characters"
            })
        }

        // hashing user password 
        const salt = await bcrypt.genSalt(10) 
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export {loginUser, registerUser};