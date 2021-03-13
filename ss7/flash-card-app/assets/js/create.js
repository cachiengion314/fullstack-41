const dropdownMenu = document.querySelector(`#dropdown-menu`);
const dropdownItems = document.querySelectorAll(`.dropdown-item`);
const dropdownInvokeBtn = document.querySelector(`#dropdown-invoke-btn`);
const frontSideForm = document.querySelector(`#front-side-form`);
const backSideForm = document.querySelector(`#back-side-form`);
const saveBtn = document.querySelector(`#save-btn`);

let dropdownItemVal = "other";
for (let i = 0; i < dropdownItems.length; ++i) {
    dropdownItems[i].onclick = (e) => {
        dropdownItemVal = dropdownItems[i].getAttribute(`data-dropdown-item`);
        dropdownInvokeBtn.textContent = dropdownItemVal;
    }
}
if (dropdownInvokeBtn) {
    dropdownInvokeBtn.textContent = dropdownItemVal;
    dropdownInvokeBtn.onclick = (e) => {
        dropdownMenu.classList.toggle(`d-block`);
    }
}

if (saveBtn) {
    saveBtn.onclick = (e) => {
        const urlEncoded = `frontside=${frontSideForm.value}&backside=${backSideForm.value}&category=${dropdownItemVal}&memory=false`;
        addFlashCard(`/api/create`, urlEncoded);
    }
}
async function addFlashCard(url, urlEncoded) {
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlEncoded
        })
    } catch (err) {
        if (err) {
            console.log(err);
        }
        return;
    }

    const rawData = await response.json();
    alert(`add successfully!`);
    window.location.href = "/create";
}