let _$addBook;
let _$addBtn;
let _$allBooksDOM;
let _$noBtn;
let _$yesBtn;

export default class Vars {
    static isPopupShow() {
        if (Vars.getAddBookDOM().style.display == "block") {
            return true;
        }
        return false;
    }
    static closePopup() {
        Vars.getAddBookDOM().style.display = "none";
        let inputs = document.querySelectorAll(`input`);
        for (let i = 0; i < inputs.length; ++i) {
            inputs[i].value = "";
        }
    }
    static createBookHTML(index, bookName, author, lsbn) {
        let htmlb = ` <div class="book mb-2">
                        <div class="index fs-sm">${index}.</div>
                        <div class="book-name fs-sm">${bookName}</div>
                        <div class="author fs-sm">${author}</div>
                        <div class="lsbn fs-sm">${lsbn}</div>
                    </div>`;
        return htmlb;
    }
    static showPopup(yesCallback = (bookName, author, lsbn) => { }, noCallback = () => { }) {
        Vars.getAddBookDOM().style.display = "block";
        Vars.getYesBtn().onclick = () => {
            let inputs = document.querySelectorAll(`#add-book input`);
            let bookName = inputs[0].value;
            let author = inputs[1].value;
            let lsbn = inputs[2].value;
            yesCallback(bookName, author, lsbn);
            Vars.closePopup();
        }
        Vars.getNoBtn().onclick = () => {
            noCallback();
            Vars.closePopup();
        }
    }
    static getBooks() {
        return Vars.getBooksListObj()[`books`];
    }
    static saveBooks(books) {
        let obj = Vars.getBooksListObj();
        obj["books"] = books;
        Vars.setBooksListObj(obj);
    }
    static setBooksListObj(booklistObj) {
        localStorage.setItem(`booksList`, JSON.stringify(booklistObj));
    }
    static getBooksListObj() {
        let rawobj = localStorage.getItem(`booksList`);
        if (!rawobj) {
            let defaultObj = { books: [] }
            Vars.setBooksListObj(defaultObj);
            return JSON.parse(localStorage.getItem(`booksList`));
        }
        return JSON.parse(rawobj);
    }
    static getNoBtn() {
        if (!_$noBtn) {
            _$noBtn = document.querySelector(`#no-btn`)
        }
        return _$noBtn;
    }
    static getYesBtn() {
        if (!_$yesBtn) {
            _$yesBtn = document.querySelector(`#yes-btn`)
        }
        return _$yesBtn;
    }
    static getAddBtn() {
        if (!_$addBtn) {
            _$addBtn = document.querySelector(`#add-btn`);
        }
        return _$addBtn;
    }
    static getAddBookDOM() {
        if (!_$addBook) {
            _$addBook = document.querySelector(`#add-book`);
        }
        return _$addBook;
    }
    static getAllBooksDOM() {
        if (!_$allBooksDOM) {
            _$allBooksDOM = document.querySelector(`#all-books`);
        }
        return _$allBooksDOM;
    }
}