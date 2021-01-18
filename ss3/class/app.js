console.log(`hello world!`);
let isOdd = require(`is-odd`); // require trong thu vien node_module (2)
let myisOdd = require(`./isOdd`); // require code minh tu viet (3)
let fs = require(`fs`); // require code co san trong node.js (1)

// fs.writeFile(`text.txt`, `Hello web 46`, (e) => {
//     if (e) return console.log(`error:`, e);
//     console.log(`write file success!`);
// });

// fs.readFile(`./text.txt`, { encoding: `utf-8` }, (e, dt) => {
//     console.log(dt);
// });

let data = fs.readFileSync(`text.txt`);
console.log(data.toString());
fs.writeFile(`number.txt`, `2 3 5 7 9`, (e) => {
    fs.readFile(`./number.txt`, { encoding: `utf-8` }, (e, rData) => {
        let data = rData.split(" ");
        let oddNumber = [];
        for (let i = 0; i < data.length; ++i) {
            data[i] = Number(data[i]);
            let num = data[i];
            if (num % 2 === 1) {
                oddNumber.push(num);
            }
        }
        console.log(oddNumber);
        fs.writeFile(`output.txt`, oddNumber.toString(), (e) => {

        });
    });
})

const oddNumber = 5;
console.log(`${oddNumber} la so: `, myisOdd(oddNumber));

// find error with fs.readFileSynce since this function doesn't support to throw any error
// try { let data = fs.readFileSync()}catch (err) { throw new Error(err) }