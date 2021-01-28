class Vars {
    constructor() {
        const yesno_objDefault = {
            _idQuestion: null
        }
        const KEY_YESNO_OBJ = "yesnoApp";
        this.setIdQuestion = (val) => {
            if (!localStorage.getItem(KEY_YESNO_OBJ)) {
                localStorage.setItem(KEY_YESNO_OBJ, JSON.stringify(yesno_objDefault));
            }
            let obj = JSON.parse(localStorage.getItem(KEY_YESNO_OBJ));
            obj._idQuestion = val;
            localStorage.setItem(KEY_YESNO_OBJ, JSON.stringify(obj));
        }
        this.getIdQuestion = () => {
            if (!localStorage.getItem(KEY_YESNO_OBJ)) {
                localStorage.setItem(KEY_YESNO_OBJ, JSON.stringify(yesno_objDefault));
            }
            return JSON.parse(localStorage.getItem(KEY_YESNO_OBJ))._idQuestion;
        }
        // index html
        let _questionDOM;
        let _noBtn;
        let _yesBtn;
        this.getQuestionDOM = () => {
            if (!_questionDOM) {
                _questionDOM = $(`#question`)[0];
            }
            return _questionDOM;
        }
        this.getNoBtn = () => {
            if (!_noBtn) {
                _noBtn = $(`#no-btn`)[0];
            }
            return _noBtn;
        }
        this.getYesBtn = () => {
            if (!_yesBtn) {
                _yesBtn = $(`#yes-btn`)[0];
            }
            return _yesBtn;
        }
        // ask html
        let _questionForm;
        let _questionTextarea;
        let _countWord;
        let _submitBtn;
        let _remainWord;
        this.getRemainWord = () => {
            if (!_remainWord) {
                _remainWord = $(`#remain-word`)[0];
            }
            return _remainWord;
        }
        this.getQuestionForm = () => {
            if (!_questionForm) {
                _questionForm = $(`#question-form`)[0];
            }
            return _questionForm;
        }
        this.getQuestionTextarea = () => {
            if (!_questionTextarea) {
                _questionTextarea = $(`#question-textarea`)[0];
            }
            return _questionTextarea;
        }
        this.getCountWord = () => {
            if (!_countWord) {
                _countWord = $(`#count-word`)[0];
            }
            return _countWord;
        }
        this.getSubmitBtn = () => {
            if (!_submitBtn) {
                _submitBtn = $(`#submit-btn`)[0];
            }
            return _submitBtn;
        }
        // all_question html
        let _allQuestionDOM;
        this.getAllQuestionDOM = () => {
            if (!_allQuestionDOM) {
                _allQuestionDOM = $(`#all-question`);
            }
            return _allQuestionDOM;
        }
        let _allBtns;
        this.getAllButtons = () => {
            if (!_allBtns) {
                _allBtns = $(`#all-question button`);
            }
            return _allBtns;
        }
    }
}