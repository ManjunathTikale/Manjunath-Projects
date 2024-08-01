// MOVIES ROUTES

import express from 'express'
import verifyJWT from '../middleware/verifyJWT.js';
import mongoose from 'mongoose';
import multer from 'multer'
import Movie from '../models/movieModel.js';
import Details from '../models/detailsModel.js';

import { randomUUID } from 'crypto'

const router = express.Router()

const localStorageForImage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads")
    },
    filename(req, file, cb) {
        cb(null, randomUUID()+".jpeg")
    }
})

const upload = multer({ storage: localStorageForImage })

// PUBLIC
// GET
// Get all movies
router.get("/", async (req, res) => {
    console.log("Get Details called.")
    try {
        // const movies = await Movie.find({})
        const details = await Details.find({})
        res.status(200).json({
            success: true,
            message: "Details fetched successfully.",
            data: details
        })

    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal ok1 Server Error."
        })
    }
})

// PRIVATE
// GET
// Get user movies
router.get("/get-user-details", verifyJWT, async (req, res) => {
    console.log("Get user details called.")
    try {
        // const movies = await Movie.find({ user: req.user._id })
        const details = await Details.find({ user: req.user._id })
        res.status(200).json({
            success: true,
            message: "Details fetched successfully.",
            data: details
        })

    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal 2 Server Error."
        })
    }
})


// PUBLIC
// GET
// Get movies details
router.get("/get-user-details", async (req, res) => {
    console.log("Get details called.")
    
    const { id  } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid detail Id.",
            data: null
        }) 
    }

    try {
        // const movie = await Movie.findById(id)
        const detail = await Details.findById(id)

        if(!detail) {
            return res.status(404).json({
                success: false,
                message: "Details not found",
                data: null
            }) 
        }

        res.status(200).json({
            success: true,
            message: "details fetched successfully.",
            data: detail
        })

    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal 3 Server Error."
        })
    }
})

router.get("/get-details/:id", async (req, res) => {
    console.log("Get movies details called.")
    
    const { id  } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid movie Id.",
            data: null
        }) 
    }

    try {
        // const movie = await Movie.findById(id)
        const detail = await Details.findById(id)

        if(!detail) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
                data: null
            }) 
        }

        res.status(200).json({
            success: true,
            message: "Movie details fetched successfully.",
            data: detail
        })

    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal 4Server Error."
        })
    }
})

router.post("/", verifyJWT,  upload.single('image'), async (req, res) => {
    const { title, description, year, category, youtubelink, content, contentlink, other1, other2} = req.body

    if (!title || !description || !year || !category || !youtubelink || !content || !contentlink || !other1 || !other2) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        })
    }

    try {
        const newDetail = await Details.create({
            user: req.user._id,
            title,
            description,
            image: req.file ? `/${req.file.path}` : '',
            year,
            category,
            youtubelink, 
            content, 
            contentlink, 
            other1, 
            other2,
        })

        res.status(201).json({
            success: true,
            message: "Detail added successfully.",
            data: newDetail
        })

    } catch (err) {
        console.error("Error in creating new detail:", err.message)
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
})


router.patch("/update-details", verifyJWT,  upload.single('image'), async (req, res) => {
    const { id, title, description, year, category, youtubelink, content, contentlink, other1, other2 } = req.body
 
    if(!id || !title || !description || !year) {
     return res.status(400).json({
         success: false,
         message: "Please fill all required fields."
     })
    }
 
    try {
        const detail = await Details.findById(id)

        if(!detail) {
            res.status(404).json({
                success: false,
                message: "detail not data.",
                data: null
            })
        }

        detail.title = title 
        detail.description = description,
        detail.year = year,
        detail.category =   category, 
        detail.youtubelink  =   youtubelink, 
        detail.content  =   content, 
        detail.contentlink  =   contentlink, 
        detail.other1   =   other1, 
        detail.other2   =   other2,
 
        detail.image = req?.file?.path ? `/${req.file.path}` : detail?.image
        // if (req.file) {
        //     detail.image = `/${req.file.path}`
        // }


        const udpatedDetail = await detail.save()

        res.status(200).json({
             success: true,
             message: "details updatd successfully.",
             data: udpatedDetail
         })
 
    } catch (err) {
         console.error({err})
         res.status(500).json({
             success: false,
             message: "Internal 5 Server Error."
         })
    }
 })


// PRIVATE
// DELETE
// Delete movie by id
router.delete("/delete-details/:id", verifyJWT, async (req, res) => {
    console.log("Delete details called.")
    
    const { id  } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid deatils Id.",
            data: null
        }) 
    }

    try {
        const detail = await Details.findById(id)

        if(!detail) {
            return res.status(404).json({
                success: false,
                message: "deatils not found",
                data: null
            }) 
        }

        // Check if movie belongs to user
        if(detail.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized!",
                data: null
            }) 
        }

        await Details.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "details deleted successfully.",
            data: null
        })

    } catch (err) {
        console.error({err})
        res.status(500).json({
            success: false,
            message: "Internal Server 6 Error."
        })
    }
})


export default router