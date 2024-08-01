import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: true
        },
        lastName: { 
            type: String, 
            required: true
        },
        email: { 
            type: String, 
            required: true,
            unique: true
        },
        password: { 
            type: String, 
            required: true,
            min: 6
        }
    }
)

userSchema.methods.toJSON = function () {
    const user = this
 
    const userObject = user.toObject()

    //Delete private data
    delete userObject.password
    delete userObject.__v

    return userObject 
}

const User = mongoose.model("User", userSchema)

export default User