const fs = require(`fs`);
const studentDatabase = JSON.parse(fs.readFileSync(`./data.json`, { encoding: "utf-8" }));

// Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
// lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
function getDetailStudent() {
  let student = studentDatabase.find(elt => {
    return elt._id === `jubuq3lfmjjmp0wrdeupt`;
  });
  if (student) {
    return student;
  }
  return `the id doesn't exist in database!`;
}

// Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName() {
  return studentDatabase.reduce((currentVal, elt) => {
    if (elt.name.includes(`Nguyễn`)) {
      currentVal++;
    }
    return currentVal;
  }, 0);
}

// Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark() {
  let sumMark = studentDatabase.reduce((currentVal, elt) => {
    return elt.mark + currentVal;
  }, 0);
  let studentsAmount = studentDatabase.length;
  return Math.round((sumMark / studentsAmount) * 10) / 10;
}

// Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile() {
  let amount = studentDatabase.reduce((currentVal, elt) => {
    if (Number(elt.mark) === 10) {
      currentVal++;
    }
    return currentVal;
  }, 0);
  fs.writeFileSync(`output.txt`, `${amount}`);
}

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile
}