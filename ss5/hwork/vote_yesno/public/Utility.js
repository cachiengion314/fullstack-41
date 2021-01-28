class Utility {
    constructor() {
        this.getRandomNumber = function (min = 0, MAX_IS_EXCLUSIVE = 2) {
            return Math.floor(Math.random() * (MAX_IS_EXCLUSIVE - min)) + min;
        }
        this.measureExecutionTime = function (callbackThatNeedToMeasure) {
            let startTimer = window.performance.now();
            callbackThatNeedToMeasure();
            let endTimer = window.performance.now();
            return endTimer - startTimer;
        }
        this.shuffleAnArray = function (arr) {
            let tempArr = [...arr];
            let rArr = [...arr];
            for (let i = 0; i < arr.length; ++i) {
                let rIndex = Utility.randomFromAToMax(0, tempArr.length);
                rArr[i] = tempArr[rIndex];
                tempArr = tempArr.filter(item => {
                    return item != rArr[i];
                });
            }
            return rArr;
        }
        this.insertCharAt = function (originStr, index, replaceStr) {
            return originStr.slice(0, index) + replaceStr + originStr.slice(index + 1);
        }
    }
}