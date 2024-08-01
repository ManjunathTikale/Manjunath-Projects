import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/userModel.js'

import jwt from 'jsonwebtoken'

const router = express.Router()

// ROUTE: http://localhost:5000/api/users/register
router.post("/register", async (req, res) => {
    console.log("/api/users/register CALLED")
    console.log(req.body)

    const { firstName, lastName, email, password } = req.body
    
    
    // Required fields
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        })
    }

    try {

        // Duplicate email check
        const foundUser = await User.findOne({ email: email })

        if(foundUser) {
            return res.status(409).json({ 
                success: false,
                message: "Email already registered."
            })
        }

        // console.log("After Found user Check")

        // generate new hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log({hashedPassword})

        const newUser = await User.create({
            firstName: firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(201).json({
            success: true,
            message: "Account registered successfully."
        })
    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
})


// ROUTE: http://localhost:5000/api/users/login
router.post("/login", async (req, res) => 
{
    console.log("/api/users/login CALLED")
    console.log(req.body)

    const { email, password } = req.body

    // Required fields
    if(!email || !password) 
    {
        return res.status(400).json(
        {
            success: false,
            message: "Please fill all required fields."
        })
    }

    try 
    {
        // If user exists
        let user = await User.findOne({ email })

        if(!user) {
            return res.status(404).json(
            { 
                success: false,
                message: "Email not registered."
            })
        }

        // Valid password check
        const isValidPassword = await bcrypt.compare(password, user.password)

        console.log({isValidPassword})

        if(!isValidPassword) {
            return res.status(409).json(
            { 
                success: false,
                message: "Invalid email or password."
            })
        }

        const accessToken = jwt.sign({ email }, 
            process.env.JWT_SECRET_KEY
        )

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: 
            {
                _id: user?._id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email, 
                accessToken
            }
        })
    } catch (err) 
    
    {
        console.log({err})
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
    
})

export default router