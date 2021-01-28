const vars = new Vars();
const utility = new Utility();

getDataFromServer();

vars.getNoBtn().onclick = async () => {
    vote(`no`);
    getDataFromServer();
}
vars.getYesBtn().onclick = async () => {
    vote(`yes`);
    getDataFromServer();
}

async function vote(type) {
    const res = await fetch(`/add-vote/${vars.getIdQuestion()}`, {
        method: `PUT`,
        body: new URLSearchParams({ type: type }),
    });
    const rawData = await res.json();
    console.log(`rDt:`, rawData);
}

async function getDataFromServer() {
    let response = await fetch(`/data`);
    let questionData = await response.json();
    showRandomQuestion(questionData);
}

function showRandomQuestion(questionData) {
    vars.setIdQuestion(questionData._id);
    vars.getQuestionDOM().textContent = `${vars.getIdQuestion()}. ` + questionData.content;
}
