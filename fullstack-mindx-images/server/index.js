const express = require(`express`);
const dotenv = require(`dotenv`);
const app = express();

const authRoute = require(`./routes/authRoute`);
const postRoute = require(`./routes/postRoute`);
const commentRoute = require(`./routes/commentRoute`);
const connectDB = require(`./database/connection`);

dotenv.config();
const PORT = process.env.PORT;

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(`/api/auth`, authRoute);
app.use(`/api/posts`, postRoute);
app.use(`/api/comments`, commentRoute);
// listen
app.listen(PORT, () => {
    console.log(`server is listen at ${PORT}`);
});