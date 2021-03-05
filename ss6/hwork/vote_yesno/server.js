console.log(`---server.js---`);
require(`dotenv`).config();
const express = require(`express`);
const fs = require(`fs`);
const app = express();
const path = require(`path`);
const lodash = require(`lodash`);
const PORT = process.env.PORT || 8000;
const mongoose = require(`mongoose`);
const QuestionModel = require(`./question`);

const con = mongoose.connect('mongodb://localhost:27017/vote', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        return;
    }
    console.log(`mongodb server is connected!`)
});
// insertmany
// findIdAndUpdate
// findOneAndUpdate
// updateOnde
// aggregate
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/public`, express.static(`public`));

app.get(`/`, (request, response) => {
    response.redirect(`public`);
});

app.get(`/allquestionindata`, async (request, response) => {
    let Database;
    try {
        Database = await QuestionModel.find();

    } catch (err) {
        return response.status(500).send({ messenger: `i can't believe the empty thing still exist in this day` });
    }

    response.send(JSON.stringify(Database));
});

app.get(`/data`, async (request, response) => {
    let q;
    try {
        q = await QuestionModel.aggregate().sample(1);

    } catch (err) {
        return response.status(500).send({ messenger: `i can't believe the empty thing is still exist in this day` });
    }

    // let randomQuestion = lodash.sample(Database);
    // response.status(200).send(
    //     { ...q[0].toObject(), isQueryins: false }
    // );
    response.status(200).send(q[0]);
});

app.put(`/add-vote/:questionid`, async (request, response) => {
    const { questionid } = request.params;
    let { type } = request.body;
    console.log(`type:`, type, `_id:`, questionid)
    let foundQuestion;
    try {
        foundQuestion = await QuestionModel.findByIdAndUpdate(questionid,
            {
                $inc: {
                    [type]: 1
                }
            },
            {
                new: true
            }
        );
        if (!foundQuestion) {
            return response.status(404).send({ messenger: `cant find anything!` });
        }
    } catch (err) {
        console.log(err)
        return response.status(300).send({ messenger: `cant find anything!` });
    }

    console.log(`foundQuestion`, foundQuestion)
    return response.send({
        data: foundQuestion,
    });
});

app.post(`/create-question`, async (request, response) => {
    const newQuestion = {
        content: request.body.content,
        yes: 0,
        no: 0,
    }

    console.log(`request.body:`, request.body);
    if (!request.body) {
        return response.status(500).send({ messenger: `i can't believe the empty thing still exist in this day` });
    }

    let savedQuestion;
    try {
        savedQuestion = new QuestionModel(newQuestion)
        savedQuestion = await savedQuestion.save(savedQuestion);
    } catch (err) {
        return response.status(500).send({ messenger: err.messenger || `something went wrong!` });
    }

    response.send({
        data: savedQuestion,
    });
});


app.delete(`/remove/:id`, async (request, response) => {
    const { id } = request.params;

    let Database;
    try {
        Database = await QuestionModel.findOneAndRemove(
            {
                _id: id
            }
        );
    } catch (err) {
        return response.status(500).send({ messenger: `${err}` });
    }

    console.log(`Database`, Database)
    response.status(200).send({ messenger: `remove success!` });
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