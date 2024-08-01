import mongoose from "mongoose"

const detailsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: { 
            type: String, 
            required: true
        },
        description: { 
            type: String, 
            required: true
        },
        image: { 
            type: String, 
            required: true,
        },
        rating: { 
            type: Number, 
            required: true,
        },
        trailer: { 
            type: String
        },
        year: { 
            type: Number, 
            required: true,
        },
        extra: { 
            type: String, 
            required: true,
        },
       genre: [String],
       writers: [String],
       directors: [String],
       
    }
)

const Details = mongoose.model("Details", detailsSchema)

export default Details