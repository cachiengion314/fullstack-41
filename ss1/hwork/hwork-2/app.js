import Vars from "./class/Vars.js";
import Book from "./class/Book.js";

showCurrentBooks();

Vars.getAddBtn().onclick = () => {
    if (Vars.isPopupShow()) {
        Vars.closePopup();
    } else {
        Vars.showPopup((bookName, author, lsbn) => {
            if (bookName.isEmpty() || author.isEmpty() || lsbn.isEmpty()) {
                console.log(`some are empty!`);
                return;
            }
            let brandnewBook = new Book(bookName, author, lsbn);
            let books = Vars.getBooksListObj()["books"];
            books.push(brandnewBook);
            Vars.saveBooks(books);
            showCurrentBooks();
            console.log(brandnewBook);
        });
    }
}
function emptyAllBooks() {
    Vars.getAllBooksDOM().innerHTML = "";
}
function showCurrentBooks() {
    emptyAllBooks();
    let books = Vars.getBooks();
    for (let i = 0; i < books.length; ++i) {
        let bookHTML = Vars.createBookHTML(i + 1, books[i].name, books[i].author, books[i].lsbn);
        Vars.getAllBooksDOM().insertAdjacentHTML(`beforeend`, bookHTML);
    }
}
String.prototype.isEmpty = function () {
    if (!this) {
        return true;
    }
    return false;
}