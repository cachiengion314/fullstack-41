let _$popup;
let _$form;
// let _clearTimeout;

export default class Vars {
    static closePopup() {
        document.querySelector(`#popup`).style.display = "none";
    }
    static showLoading(completed = Vars.closePopup, fakeLoadingTime = 1000) {
        let LOADING = "loading...!";
        Vars.showPopup(LOADING, LOADING, LOADING, LOADING);
        Vars.getPopupTitleDOM().textContent = LOADING;
        setTimeout(() => {
            completed();
        }, fakeLoadingTime);
    }
    static showPopup(name, email, company, follower, imgUrl = "https://image.flaticon.com/icons/png/512/1828/1828833.png") {
        document.querySelector(`#popup`).style.display = "block";
        let $allInfos = Vars.getAllPopupInfoDOM();
        let $title = Vars.getPopupTitleDOM();
        let $name = $allInfos[0];
        let $email = $allInfos[1];
        let $company = $allInfos[2];
        let $follower = $allInfos[3];
        let $img = Vars.getPopupImgDOM();
        $title.textContent = `Thông tin tài khoản: ${name ? name : `Không tìm thấy!`}`;
        $name.textContent = "Tên: ";
        $email.textContent = "Email: ";
        $company.textContent = "Company: ";
        $follower.textContent = "Follower: ";

        $name.textContent += name ? name : `...`;
        $email.textContent += email ? email : `...`;
        $company.textContent += company ? company : `...`;
        if (!follower && follower !== 0) {
            follower = `...`;
        }
        $follower.textContent += follower;
        $img.src = imgUrl;
    }
    static getGithubApiLink(userName) {
        return `https://api.github.com/users/${userName}`;
    }
    static getFormDOM() {
        if (!_$form) {
            _$form = document.querySelector(`#add-form`);
        }
        return _$form;
    }
    static getSubmitBtn() {
        return Vars.getFormDOM().querySelector(`button`);
    }
    static getAddInputDOM() {
        return Vars.getFormDOM().querySelector(`input`);
    }
    static getPopupDOM() {
        if (!_$popup) {
            _$popup = document.querySelector(`#popup`);
        }
        return _$popup;
    }
    static getPopupTitleDOM() {
        return Vars.getPopupDOM().querySelector(`#popup-title`);
    }
    static getPopupImgDOM() {
        return Vars.getPopupDOM().querySelector(`img`);
    }
    static getAllPopupInfoDOM() {
        return Vars.getPopupDOM().querySelectorAll(`li`);
    }
}
