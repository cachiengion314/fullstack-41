// let p = fetch(`https://api.github.com/users/cachiengion314`);
// p.then(respond => {
//     let pj = respond.json();
//     pj.then((rawData) => {
//         console.log(rawData);
//     });
// });

function requestData(success = (rText) => { }) {
    let r = new XMLHttpRequest();
    r.open(`GET`, `https://api.github.com/users/cachiengion314`);
    r.onload = () => { success(r.responseText) }
    r.onerror = () => { console.log(r.statusText) }
    r.send();
}

requestData((rText) => { console.log(`rText:`, rText); });