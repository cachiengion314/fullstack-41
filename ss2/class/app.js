// lưu ý phân biệt sự khác nhau của hai cách tiếp cận dưới

function doAsync(url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => onSuccess(xhr.responseText);
    xhr.onerror = () => onError(xhr.statusText);
    xhr.send();
}

// Usage:
doAsync("https://api.github.com/users/anhtbok92", value => {
    console.log(value);
  },
    error => {
    console.log(error);
  }
);

function doAsync(url) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, rejected) => {
        xhr.open(`GET`, url);

        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => rejected(xhr.statusText);
        xhr.send();
    });
}

doAsync(`https://api.github.com/users/anhtbok92`).then((rawData) => { console.log(rawData) })
    .catch((e) => { console.log(e) });

// let promiseResolve = new Promise((resolve, rejected) => {
//     let obj = { name: `hoang nam`, gender: `male`, country: `VietNam` }
//     resolve(obj);
// });
// let promiseRejected = new Promise((resolve, rejected) => {
//     rejected(`error occur!`);
// });
// console.log(`trang thai cua promise la:`, promiseRejected);

// promiseRejected.catch((e) => { console.log(`error in the promiseRejected:`, e) }); // catch the error

// promiseResolve.then((rawData) => {
//     console.log(`rawData in the promiseResolve`, rawData); // handle rawData
// });

