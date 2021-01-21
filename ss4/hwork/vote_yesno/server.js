// npm init -y: auto asign all entry for initialize node package manager
// framework bigger than libery
// this is a server code file
// npm init : create local npm
require(`dotenv`).config();
const express = require(`express`);
const fs = require(`fs`);
const app = express();
const path = require(`path`); // giải quyết vấn để conflict đường dẫn giữa các OS
const PORT = process.env.PORT || 8000;

app.use(express.static(`public`));
// => tự động sinh ra các đường dẫn như sau:
// app.get("/public/page-404.html")
// app.get("/public/index.js")
// app.get("/public/style.css")

// config cho client gửi lên với header application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));
// config cho client gửi lên với header 'Content-Type': 'application/json'
app.use(express.json());

// thao tác gõ đường dẫn rồi enter chính là method get "/"
app.get(`/`, (request, response) => {
    console.log(__dirname); // __dirname tương ứng với thư mục hiện tại đang đứng
    response.sendFile(path.resolve(__dirname, `public`, `index.html`));
});
app.get(`/style.css`, (request, response) => {
    response.sendFile(path.resolve(__dirname, `public`, `style.css`));
});
app.get(`/ask`, (request, response) => {
    response.sendFile(path.resolve(__dirname, `public`, `ask`, `ask.html`));
});
app.get(`/data`, (request, response) => {
    response.sendFile(path.resolve(__dirname, `data.json`));
})

app.post(`/create-question`, (request, response) => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync('data.json'));
    } catch (err) {
        data = [];
    }
    const newQuestion = {
        _id: data.length + 1,
        content: request.body.content,
        yes: 0,
        no: 0,
    }

    console.log(request.body);
    let newData = [...data, newQuestion];
    fs.writeFileSync(`data.json`, JSON.stringify(newData));
    response.send({
        success: 1,
        data: newQuestion,
    });
});

app.get(`/*`, (request, response) => {
    // give client 404 page when user write wrong direction
    response.sendFile(path.resolve(__dirname, `public`, `page404`, `page404.html`));
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server started at ${PORT}`);
});