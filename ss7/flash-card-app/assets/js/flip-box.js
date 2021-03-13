const FORGET = "Forget";
const REMEMBER = "Remember";
const randomBtn = document.querySelector(`#random-btn`);
const codeBtn = document.querySelector(`#code-btn`);
const vocalBtn = document.querySelector(`#vocal-btn`);
const otherBtn = document.querySelector(`#other-btn`);
const spinnerGrow = document.querySelector(`#spinner-grow`);

const memoryBtn = document.querySelector(`#memory-btn`);
const nextBtn = document.querySelector(`#next-btn`);
const memoryText = document.querySelector(`#memory-text`);
const card = JSON.parse(memoryBtn.getAttribute(`data-card`));

let thisCardData = card;
calculateMemoryTextDisplay(thisCardData.memory);
function calculateMemoryTextDisplay(memory) {
    if (memory) {
        memoryText.style.display = "block";
        memoryBtn.textContent = FORGET;
    } else {
        memoryText.style.display = "none";
        memoryBtn.textContent = REMEMBER;
    }
}

function toggleSpinnerGrow() {
    spinnerGrow.classList.toggle(`d-none`);
}
randomBtn.onclick = () => {
    toggleSpinnerGrow();
    window.location.href = `/`;
}
codeBtn.onclick = () => {
    toggleSpinnerGrow();
    window.location.href = `/?category=code`;
}
vocalBtn.onclick = () => {
    toggleSpinnerGrow();
    window.location.href = `/?category=vocal`;
}
otherBtn.onclick = () => {
    toggleSpinnerGrow();
    window.location.href = `/?category=other`;
}
nextBtn.onclick = () => {
    toggleSpinnerGrow();
    window.location.href = `/`;
}

memoryBtn.onclick = () => {
    let remembered = thisCardData.memory;
    if (remembered) {
        remembered = false;
    } else {
        remembered = true;
    }
    const formUrlencoded = `frontside=${card.frontside}&backside=${card.backside}&category=${card.category}&memory=${remembered}`;
    updateCard(`/api/flash-card/${card._id}`, formUrlencoded);
}

async function updateCard(url, formUrlencoded) {
    try {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formUrlencoded
        })
    } catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
    toggleSpinnerGrow();
    thisCardData = await getCardData(`http://localhost:4000/api/flash-card?id=${card._id}`);
    toggleSpinnerGrow();
    calculateMemoryTextDisplay(thisCardData.memory);
}
async function getCardData(url) {
    let res;
    try {
        res = await fetch(url);
    }
    catch (err) {
        if (err) {
            console.log(err);
            return;
        }
    }
    return await res.json();
}