import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
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
       genre: [String],
       writers: [String],
       directors: [String],
    }
)

const Movie = mongoose.model("Movie", movieSchema)

export default Movie