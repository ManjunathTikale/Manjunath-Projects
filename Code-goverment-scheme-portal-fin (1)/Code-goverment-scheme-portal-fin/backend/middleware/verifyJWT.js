import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log({authHeader})
    if (!authHeader) return res.sendStatus(401) //Unauthoirzed

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token, 
        process.env.JWT_SECRET_KEY,
        async (err, decoded) => {
            if (err) return res.sendStatus(403) // Forbidden, invalid token 
            const foundUser = await User.findOne({ email: decoded.email }).select("-password")
            if (!foundUser) return res.sendStatus(404) // User not found!
            req.user = foundUser
            next()
        }
    )
}

export default verifyJWT