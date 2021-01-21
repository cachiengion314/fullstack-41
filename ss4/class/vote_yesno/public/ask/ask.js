const vars = new Vars();
const utility = new Utility();
const mainPage = "/";
const MAX_WORDS = 200;

vars.getQuestionTextarea().oninput = () => {
    let content = vars.getQuestionTextarea().value;
    let remainWord = MAX_WORDS - content.length;
    vars.getRemainWord().textContent = remainWord;
}

vars.getQuestionForm().onsubmit = (event) => {
    event.preventDefault();
    let content = vars.getQuestionTextarea().value;
    if (!content.includes(`?`)) {
        content += `?`;
    }
    const question = { content }

    postQuestionToDatabase(question);
}

function postQuestionToDatabase(question) {
    fetch(`/create-question`, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question),
    })
        .then(loadMainPage, (failReason) => {
            console.log(failReason);
        });
}

function loadMainPage() {
    window.location.href = mainPage;
}