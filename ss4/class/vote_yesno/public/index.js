// client code
const createForm = document.getElementById(`form-question`);
const textAreaQuestion = document.getElementById(`create-textarea`);
console.log(textAreaQuestion);
createForm.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const content = textAreaQuestion.value;
    const question = { content }

    fetch(`/create-question`, {
        method: `POST`,
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: new URLSearchParams(question),
    })
        .then(async (res) => {
            let rawdata = await res.json();
            console.log(rawdata);
        });
})