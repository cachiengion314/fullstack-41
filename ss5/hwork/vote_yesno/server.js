console.log(`---server.js---`);
require(`dotenv`).config();
const express = require(`express`);
const fs = require(`fs`);
const app = express();
const path = require(`path`);
const PORT = process.env.PORT || 8000;
const mongoose = require(`mongoose`);
const QuestionModel = require(`./question`);

const con = mongoose.connect('mongodb://localhost:27017/vote', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return;
    }
    console.log(`mongodb server is connected!`)
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/public`, express.static(`public`));

app.get(`/`, (request, response) => {
    response.redirect(`public`);
});

app.get(`/allquestionindata`, (request, response) => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync('./data.json'));
    } catch (err) {
        data = [];
    }
    response.send(JSON.stringify(data));
});

app.get(`/data`, (request, response) => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync('./data.json'));
    } catch (err) {
        data = [];
    }
    let randomNumber = Math.floor(Math.random() * (data.length - 0)) + 0;
    let randomQuestion = data[randomNumber];
    response.send(JSON.stringify(randomQuestion));
});

app.put(`/add-vote/:questionid`, (request, response) => {
    const { questionid } = request.params;
    const { type } = request.body;
    console.log(`type:`, type, `questionid:`, questionid);
    let data;
    try {
        data = JSON.parse(fs.readFileSync('./data.json'));
    } catch (err) {
        data = [];
    }
    const foundQuestion = data.find(question => {
        const sameId = parseInt(question._id) === parseInt(questionid);
        return sameId;
    });

    if (type === `yes` || type === `no`) {
        foundQuestion[type]++;
    }
    data[data.indexOf(foundQuestion)] = foundQuestion;
    fs.writeFileSync(`./data.json`, JSON.stringify(data));

    if (foundQuestion) {
        return response.send({
            success: 1,
            data: foundQuestion,
        });
    }
});

app.post(`/create-question`, async (request, response) => {
    const newQuestion = {
        content: request.body.content,
        yes: 0,
        no: 0,
    }

    console.log(`request.body:`, request.body);

    const saveQuestion = await QuestionModel.create(newQuestion);

    response.send({
        success: 1,
        data: saveQuestion,
    });
});

app.get(`/*`, (request, response) => {
    response.sendFile(path.resolve(__dirname, `public`, `page404`, `page404.html`));
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server started at ${PORT}`);
});