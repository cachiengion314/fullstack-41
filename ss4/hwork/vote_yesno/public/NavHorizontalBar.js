const NAV_HORT_DOM = `
    <ul class="custom-nav">
        <li class="custom-li"><a href="/" class="fs-sm deco-none ml-5 mr-5">Home Page</a></li>
        <div class="vert-bar"></div>
        <li class="custom-li"><a href="/ask" class="fs-sm deco-none ml-5 mr-5">Ask Page</a></li>
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