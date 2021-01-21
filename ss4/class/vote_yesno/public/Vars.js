class Vars {
    constructor() {
        // index html vars
        let _questionDOM;
        let _noBtn;
        let _yesBtn;
        this.getQuestionDOM = () => {
            if (!_questionDOM) {
                _questionDOM = document.querySelector(`#question`);
            }
            return _questionDOM;
        }
        this.getNoBtn = () => {
            if (!_noBtn) {
                _noBtn = document.querySelector(`#no-btn`);
            }
            return _noBtn;
        }
        this.getYesBtn = () => {
            if (!_yesBtn) {
                _yesBtn = document.querySelector(`#yes-btn`);
            }
            return _yesBtn;
        }
        // ask html vars
        let _questionForm;
        let _questionTextarea;
        let _countWord;
        let _submitBtn;
        let _remainWord;
        this.getRemainWord = () => {
            if (!_remainWord) {
                _remainWord = document.querySelector(`#remain-word`);
            }
            return _remainWord;
        }
        this.getQuestionForm = () => {
            if (!_questionForm) {
                _questionForm = document.querySelector(`#question-form`);
            }
            return _questionForm;
        }
        this.getQuestionTextarea = () => {
            if (!_questionTextarea) {
                _questionTextarea = document.querySelector(`#question-textarea`);
            }
            return _questionTextarea;
        }
        this.getCountWord = () => {
            if (!_countWord) {
                _countWord = document.querySelector(`#count-word`);
            }
            return _countWord;
        }
        this.getSubmitBtn = () => {
            if (!_submitBtn) {
                _submitBtn = document.querySelector(`#submit-btn`);
            }
            return _submitBtn;
        }
    }
}