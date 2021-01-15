import Vars from "./class/Vars.js";

Vars.getFormDOM().onsubmit = (e) => {
    e.preventDefault();
    let iteratorDt = new FormData(e.target).entries();
    let obj = {}
    for (let [key, value] of iteratorDt) {
        obj[key] = value;
    }
    Vars.showLoading(() => {
        createXhr(Vars.getGithubApiLink(obj[`username`]), (r, statusText) => {
            if (statusText === `Not Found`) {
                console.log(`404 not found!`);
                Vars.showPopup(false, false, false, false);
            } else {
                let { avatar_url, login, email, company, followers } = JSON.parse(r);
                Vars.showPopup(login, email, company, followers, avatar_url);
            }
        }, (e) => {
            console.log(`rejected:`, e);
            Vars.showPopup(false, false, false, false);
        });
    });
    e.target.querySelector(`input`).value = "";
}

function createXhr(url, resolved, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => { resolved(xhr.responseText, xhr.statusText) };
    xhr.onerror = () => { rejected(xhr.statusText) };
    xhr.send();
}
function createXhrPromise(url) {
    let xhr = new XMLHttpRequest();
    return new Promise((resolved, rejected) => {
        xhr.open(`GET`, url);
        xhr.onload = () => { resolved(xhr.responseText, xhr.statusText) };
        xhr.onerror = () => { rejected(xhr.statusText) };
        xhr.send();
    });
}