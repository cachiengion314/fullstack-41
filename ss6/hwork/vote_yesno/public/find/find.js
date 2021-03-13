vars.getFindFrom().onsubmit = (e) => {
    e.preventDefault();
    let dataIterator = new FormData(e.target).entries();
    let obj = {};
    for (let [key, val] of dataIterator) {
        obj[key] = val;
    }
    const { searchkey } = obj;
    clearSearchItems();
    searchKeyword(searchkey);
}
vars.getFindMostYesBtn().onclick = (e) => {
    e.preventDefault();
    findMostYes();
}
function clearSearchItems() {
    vars.getFindSearchItems().empty();
}
async function findMostYes() {
    let foundData;
    try {
        let rawData = await fetch(`/question/max-yes`);
        foundData = await rawData.json();
        
    } catch (err) {
        return console.log(err);
    }
    vars.getFindSearchItems().append(getQuestionBLock(foundData[0]));
}
async function searchKeyword(searchkey) {
    let foundData;
    try {
        let rawData = await fetch(`/content-filter/${searchkey}`)
        foundData = await rawData.json();
    } catch (err) {
        return console.log(err);
    }

    for (let elt of foundData) {
        vars.getFindSearchItems().append(getQuestionBLock(elt));
    }
    let allbtns = vars.getAllButtons();
    for (let btn of allbtns) {
        $(btn).attr("disabled", true);
    }
}