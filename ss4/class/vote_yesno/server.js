// npm init -y
// framework bigger than libery
// this is a server code file
// npm init : create local npm
const express = require(`express`);
const fs = require(`fs`);
const app = express();
const path = require(`path`); // giải quyết vấn để
app.use(express.static(`public`));
// => sinh ra các đường dẫn như sau:
// app.get("/")
// app.get("/style.css")

// config cho client gửi lên với header application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));
// config cho client gửi lên với header  'Content-Type': 'application/json'
app.use(express.json());

// thao tác gõ đường dẫn rồi enter chính là method get "/"
app.get(`/`, (request, response) => {
    console.log(__dirname); // tương ứng với thư mục hiện tại đang đứng
    response.sendFile(path.resolve(__dirname, `./public/index.html`));
});
app.get(`/style.css`, (request, response) => {
    console.log(__dirname); // tương ứng với thư mục hiện tại đang đứng
    response.sendFile(path.resolve(__dirname, `./public/style.css`));
});

app.get(`/*`, (request, response) => {
    response.sendFile(path.resolve(__dirname, `./public/index-404.html`));
});



app.post(`/create-question`, (request, response) => {
    const data = JSON.parse(fs.readFileSync(`data.json`));
    const newQuestion = {
        _id: data.length + 1,
        content: request.body.content,
        yes: 0,
        no: 0,
    }
    console.log(request.body);
    response.send({
        success: 1,
        data: newQuestion,
    });
});


app.listen(8000, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server started!`);
});