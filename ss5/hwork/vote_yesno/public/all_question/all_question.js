console.log(`---all_question.js---`);
const vars = new Vars();
const utility = new Utility();
const getQuestionBLock = function () {
    let question = arguments[0];
    let noPercent = question.no / (question.no + question.yes) * 100;
    let yesPercent = 100 - noPercent;
    let noBtn = `<button class="custom-btn yesno-btn fs-md" style="width: ${noPercent}%">No: ${question.no}</button>`;
    let yesBtn = ` <button class="custom-btn yesno-btn fs-md" style="width: ${yesPercent}%">Yes: ${question.yes}</button>`;
    if (!noPercent || noPercent < 10) {
        noBtn = `<button class="custom-btn yesno-btn fs-md" style="width: ${noPercent}%"></button>`;
    }
    if (!yesPercent || yesPercent < 10) {
        yesBtn = ` <button class="custom-btn yesno-btn fs-md" style="width: ${yesPercent}%"></button>`;
    }
    const QUESTION_BLOCK = `
        <div class="question-block border-opacity mb-5">
            <div id="question" class="question fs-md">
                ${question._id}. ${question.content}
            </div>
            <div class="yesno-percent">
                ${noBtn}
                ${yesBtn}
            </div>
        </div>
    `;
    return QUESTION_BLOCK;
}

showPercent();

async function showPercent() {
    const database = await getAllQuestion();
    for (let elt of database) {
        vars.getAllQuestionDOM().append(getQuestionBLock(elt));
    }
    let allbtns = vars.getAllButtons();
    for (let btn of allbtns) {
        $(btn).attr("disabled", true);
    }
}

async function getAllQuestion() {
    const res = await fetch(`/allquestionindata`);
    const dt = await res.json();
    return dt;
}
