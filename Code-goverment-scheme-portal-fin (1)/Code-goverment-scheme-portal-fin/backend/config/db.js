import mongoose from 'mongoose'

const connectDB = async () => {
    // Local DB or Cloud
    const MONGO_URI =  process.env.MONGO_URI 
     console.log({MONGO_URI})
    try {
        // Connect to DB
        const connection = await mongoose.connect(MONGO_URI)

        console.log("DB connected successfully.")
    } catch (err) {
        console.error(err)

    }
}

export default connectDB