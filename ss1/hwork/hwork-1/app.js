import Vars from "./class/Vars.js";

showCurrentSavedTasks();

Vars.getAddInput().onkeyup = () => {
    let val = Vars.getAddInput().value;
    filterContent(val);
}

Vars.getAddBtn().onclick = () => {
    let taskContent = Vars.getAddInput().value;
    addTask(taskContent);
    // Vars.getAddInput().value = ``;
}

function addTask(taskContent) {
    if (taskContent == ``) {
        return;
    }
    let alltasks = Vars.getAllTasks();
    Vars.getAllTasksDOM().insertAdjacentHTML(`beforeend`, Vars.createTask(alltasks.length + 1, taskContent));
    Vars.saveTaskContent(taskContent);
    alltasks = Vars.getAllTasks();
    Vars.getRemoveBtnNodeAt(alltasks.length - 1).onclick = () => {
        Vars.showPopup(`Bạn có chắc muốn xóa nội dung thứ ${alltasks.length} không?`, () => {
            removeTaskDOMAt(alltasks.length - 1);
        });
    };
}

function showTaskAt(index, taskContent) {
    Vars.getAllTasksDOM().insertAdjacentHTML(`beforeend`, Vars.createTask(index, taskContent));
}

function filterContent(keySearch) {
    let foundData = Vars.getCurrentTasksDOM();
    let tasks = foundData.tasks;
    let taskPairs = foundData.taskPairs;
    for (let i = 0; i < tasks.length; ++i) {
        let textVal = tasks[i].textContent;
        if (textVal.toLocaleUpperCase().indexOf(keySearch.toLocaleUpperCase()) > -1) {
            taskPairs[i].style.display = "";
        } else {
            taskPairs[i].style.display = "none";
        }
    }
}

function emptyAllTasks() {
    Vars.getAllTasksDOM().innerHTML = ``;
}

function showCurrentSavedTasks() {
    emptyAllTasks();
    let alltasks = Vars.getAllTasks();
    for (let i = 0; i < alltasks.length; ++i) {
        showTaskAt(i + 1, alltasks[i]);
    }
    onclickAllRemoveBtns();
}

function removeTaskDOMAt(index) {
    Vars.deleteTaskContentAt(index);
    showCurrentSavedTasks();
}

function onclickAllRemoveBtns() {
    let removeBtns = Vars.getRemoveBtnNodeList();
    for (let i = 0; i < removeBtns.length; ++i) {
        removeBtns[i].onclick = () => {
            Vars.showPopup(`Bạn có chắc muốn xóa nội dung thứ ${i + 1} không?`, () => {
                removeTaskDOMAt(i);
            });
        }
    }
}