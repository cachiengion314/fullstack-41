const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`);
const path = require(`path`);
// const morgan = require(`morgan`);
const router = require(`./server/routes/router`);

const connectDB = require(`./server/database/connection`);

dotenv.config({ path: `config.env` });
const PORT = process.env.PORT || 8080;

// app.use(morgan(`tiny`));
// use mongodb
connectDB();
// body-parser
app.use(express.urlencoded({ extended: true }));
app.use("/views", express.static(path.resolve(__dirname, `views`)));
app.use("/assets", express.static(path.resolve(__dirname, `assets`)));
app.set(`view engine`, `ejs`);
// load router
app.use(`/`, router);
// listen
app.listen(PORT, () => {
    console.log(`server is listen at ${PORT}`);
});