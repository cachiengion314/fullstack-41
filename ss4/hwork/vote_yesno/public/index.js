const vars = new Vars();
const utility = new Utility();

getDataFromServer();

function showRandomQuestion(database) {
    let questionTxt = database[utility.getRandomNumber(0, database.length)].content;
    vars.getQuestionDOM().textContent = questionTxt;
}

async function getDataFromServer() {
    let response = await fetch(`/data`);
    let rawDatabase = await response.json();
    showRandomQuestion(rawDatabase);
}