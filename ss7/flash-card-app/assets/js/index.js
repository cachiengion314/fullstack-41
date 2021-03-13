const flipperDom = document.querySelector(`.flip-container`);
const flipperBtn = document.querySelector(`#flip-btn`);
if (flipperDom) {
    flipperDom.onclick = (e) => {
        flipperDom.classList.toggle(`flpping`);
    }
}
if (flipperBtn) {
    flipperBtn.onclick = (e) => {
        flipperDom.classList.toggle(`flpping`);
    }
}