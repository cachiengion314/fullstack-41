let _$addBook;
let _$addBtn;

export default class Vars {
    static getAddBtn() {
        if (!_$addBtn) {
            return document.querySelector(`#add-btn`);
        }
        return _$addBtn;
    }
    static getAddBookDOM() {
        if (!_$addBook) {
            return document.querySelector(`#add-book`);
        }
        return _$addBook;
    }
}