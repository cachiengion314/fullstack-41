import Vars from "./class/Vars.js";

Vars.getAddBtn().onclick = () => {
    if (Vars.getAddBookDOM().style.display == "block") {
        Vars.getAddBookDOM().style.display = "none";
    } else {
        Vars.getAddBookDOM().style.display = "block";
    }
}