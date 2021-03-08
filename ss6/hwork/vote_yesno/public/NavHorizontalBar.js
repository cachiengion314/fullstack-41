const NAV_HORT_DOM = `
    <ul class="custom-nav">
        <li class="custom-li"><a href="/public" class="fs-sm deco-none mx-5">Home Page</a></li>
        <div class="vert-bar"></div>
        <li class="custom-li"><a href="/public/ask/ask.html" class="fs-sm deco-none mx-5">Ask Page</a></li>
        <div class="vert-bar"></div>
        <li class="custom-li"><a href="/public/all_question/all_question.html" class="fs-sm deco-none mx-5">All question</a></li>
        <div class="vert-bar"></div>
        <li class="custom-li"><a href="/public/find/find.html" class="fs-sm deco-none mx-5">Find question</a></li>
    </ul>
`;

class NavHorizontalBar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.insertAdjacentHTML(`beforeend`, NAV_HORT_DOM);
    }
}

window.customElements.define(`navh-bar`, NavHorizontalBar);