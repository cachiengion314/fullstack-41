let _$addInput;
let _$addBtn;
let _$allTasks;
let _$popup;
let _$yesBtn;
let _$noBtn;
let _KEY_TASK_LIST = `tasksList`;
let _defaultTaskListObj = {
    allTasks: [],
}

export default class Vars {
    static get ALL_TASKS() {
        return `allTasks`;
    }
    static enabledBtns() {
        let btns = document.querySelectorAll(`button`);
        for (let i = 2; i < btns.length; ++i) {
            btns[i].disabled = false;
        }
    }
    static disabledBtns() {
        let btns = document.querySelectorAll(`button`);
        for (let i = 2; i < btns.length; ++i) {
            btns[i].disabled = true;
        }
    }
    static closePopup() {
        Vars.getPopupDOM().style.display = `none`;
        Vars.enabledBtns();
    }
    static showPopup(CONTENT, yesCallback = () => { }, noCallback = () => { }) {
        Vars.getPopupDOM().style.display = `block`;
        Vars.disabledBtns();
        let $popupTitle = document.querySelector(`#popup-title`);
        $popupTitle.textContent = CONTENT;
        Vars.getYesBtn().onclick = () => {
            yesCallback();
            Vars.closePopup();
        }
        Vars.getNoBtn().onclick = () => {
            noCallback();
            Vars.closePopup();
        }
    }
    static getYesBtn() {
        if (!_$yesBtn) {
            return document.querySelector(`#yes-btn`);
        }
        return _$yesBtn;
    }
    static getNoBtn() {
        if (!_$noBtn) {
            return document.querySelector(`#no-btn`);
        }
        return _$noBtn;
    }
    static getPopupDOM() {
        if (!_$popup) {
            return document.querySelector(`#popup`);
        }
        return _$popup;
    }
    static getAllTasks() {
        return Vars.getTasksListObj()[Vars.ALL_TASKS];
    }
    static deleteTaskContentAt(index) {
        let taskListObj = Vars.getTasksListObj();
        taskListObj[Vars.ALL_TASKS].splice(index, 1);
        Vars.setTasksListObj(taskListObj);
    }
    static saveTaskContent(taskContent) {
        let taskListObj = Vars.getTasksListObj();
        taskListObj[Vars.ALL_TASKS].push(taskContent);
        Vars.setTasksListObj(taskListObj);
    }
    static setTasksListObj(taskListObj) {
        localStorage.setItem(_KEY_TASK_LIST, JSON.stringify(taskListObj));
    }
    static getTasksListObj() {
        if (!localStorage.getItem(_KEY_TASK_LIST)) {
            Vars.setTasksListObj(_defaultTaskListObj);
        }
        return JSON.parse(localStorage.getItem(_KEY_TASK_LIST));
    }
    static getAddInput() {
        if (!_$addInput) {
            return document.querySelector(`#add-input`);
        }
        return _$addInput;
    }
    static getAddBtn() {
        if (!_$addBtn) {
            return document.querySelector(`#add-btn`);
        }
        return _$addBtn;
    }
    static getAllTasksDOM() {
        if (!_$allTasks) {
            return document.querySelector(`#all-tasks`);
        }
        return _$allTasks
    }
    static createTask(index, content) {
        let _TASK = `
            <div class="task-pair mb-1">
                <div class="index fs-sm">${index}.</div>
                <div class="task fs-sm">${content}</div>
                <div class="align-center">
                    <button class="custom-btn remove-btn fs-sm">X</button>
                </div>
            </div>
        `;
        return _TASK;
    }
    static getCurrentTasksDOM() {
        let tasks = [];
        let taskPairs = document.querySelectorAll(`.task-pair`);
        for (let i = 0; i < taskPairs.length; ++i) {
            let task = taskPairs[i].getElementsByClassName(`task`)[0];
            tasks.push(task);
        }
        let foundData = {
            tasks: tasks,
            taskPairs: taskPairs,
        }
        return foundData;
    }
    static getRemoveBtnNodeAt(index) {
        let removeBtns = Vars.getRemoveBtnNodeList();
        return removeBtns[index];
    }
    static getRemoveBtnNodeList() {
        let removeBtns = document.querySelectorAll(`.task-pair .remove-btn`);
        return removeBtns;
    }
}