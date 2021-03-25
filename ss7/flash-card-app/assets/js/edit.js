const dropdownMenu = document.querySelector(`#dropdown-menu`);
const dropdownItems = document.querySelectorAll(`.dropdown-item`);
const dropdownInvokeBtn = document.querySelector(`#dropdown-invoke-btn`);
const frontSideForm = document.querySelector(`#front-side-form`);
const backSideForm = document.querySelector(`#back-side-form`);
const saveBtn = document.querySelector(`#save-btn`);

const dataCardIdDom = document.querySelector(`#data-card-id`);
const dataCardId = dataCardIdDom.getAttribute(`data-card-id`);

let dropdownItemVal = document.querySelector(`#dropdown-form`).getAttribute(`data-selected-item`);
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
        const formUrlencoded = `frontside=${frontSideForm.value}&backside=${backSideForm.value}&category=${dropdownItemVal}`;
        updateCard(`/api/flash-card/${dataCardId}`, formUrlencoded);
    }
}
async function updateCard(url, formUrlencoded) {
    let response;
    try {
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formUrlencoded
        })
    } catch (err) {
        if (err) {
            console.log(err);
        }
        return;
    }
    alert(`update successfully!`);
    window.location.href = `/`;
    // get the id: location.pathname.split("/").pop()
}