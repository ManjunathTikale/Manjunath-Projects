import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

// Routes
import userRouter from './routes/userRoutes.js'
import movieRouter from './routes/movieRoutes.js'
import detailsRoutes from './routes/detailsRoutes.js'

import connectToDB from './config/db.js'

const __dirname = path.resolve()

const app = express()
const PORT = 5000

dotenv.config()

connectToDB()

// Json Middleware
app.use(express.json())

// Routers Middleware
app.use('/api/users', userRouter)
app.use('/api/movies', movieRouter)
app.use('/api/details', detailsRoutes)

app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

// CRUD EXAMPLE
// app.get("/users", (req, res) => {
//     res.send("Users GET Called")
//     // res.status(500).send("Server Error")
// })

// app.post("/users", (req, res) => {
//     res.status(201).send("Users POST Called")
//     // res.status(500).send("Server Error")
// })

// app.put("/users", (req, res) => {
//     res.send("Users PUT Called")
// })

// app.delete("/users", (req, res) => {
//     res.send("Users DELETE Called")
// }
// CRUD EXAMPLE END

app.listen(PORT, () => console.log("Server is running on PORT 5000"))