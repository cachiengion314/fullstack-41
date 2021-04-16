const express = require(`express`)
const dotenv = require(`dotenv`)
const app = express()
const cors = require('cors')

const authRoute = require(`./routes/authRoute`)
const postRoute = require(`./routes/postRoute`)
const commentRoute = require(`./routes/commentRoute`)
const connectDB = require(`./database/connection`)
const { logger } = require(`./middleware/logger`)

dotenv.config()
const PORT = process.env.PORT;

connectDB()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(`*`, logger)
app.use(`/`, (req, res) => {
    res.send("welcome")
})
app.use(`/api/auth`, authRoute)
app.use(`/api/posts`, postRoute)
app.use(`/api/comments`, commentRoute)
// listen
app.listen(PORT, () => {
    console.log(`server is listen at ${PORT}`);
})