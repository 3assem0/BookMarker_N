var siteName = document.getElementById('siteNameInput');
var siteURL = document.getElementById('siteUrlInput');
var addSiteButton = document.getElementById('addSiteButton');

var bookmarkArr = JSON.parse(localStorage.getItem("sites")) ?? [];
var isUpdating = false;
var currentIndex = null;

dispalyProducts();

addSiteButton.addEventListener('click', addsite);

function addsite() {
    validateSiteData();

    if (/^\w{3,}(\s+\w+)*$/.test(siteNameInput.value) && /(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9#-]*)*\/?/.test(siteUrlInput.value)) {
        var product = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };

        // if (isUpdating && currentIndex !== null) {
        //     bookmarkArr[currentIndex] = product;
        //     isUpdating = false;
        //     currentIndex = null;
        // } else {
            bookmarkArr.push(product);
        // }

        onDataChange();
        clearForm();
    }
}

function dispalyProducts() {
    var cartoona = "";
    for (var i = 0; i < bookmarkArr.length; i++) {
        cartoona += `
        <tr>
        <td>${i}</td>
        <td>${bookmarkArr[i].name}</td>
        <td><button onclick="visitsite(${i})" id="visitButton" class="btn btn-outline-success">Visit</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    //  <td><button onclick="updateSite(${i})" class="btn btn-outline-success">Update</button></td>//
    document.getElementById("tableBody").innerHTML = cartoona;
}

function validateSiteData() {
    if (/^\w{3,}(\s+\w+)*$/.test(siteNameInput.value)) {
        siteNameAlert.classList.add("d-none");
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
    } else {
        siteNameAlert.classList.remove("d-none");
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
    }
    if (/(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9#-]*)*\/?/.test(siteUrlInput.value)) {
        siteUrlAlert.classList.add("d-none");
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
    } else {
        siteUrlAlert.classList.remove("d-none");
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
    }
}

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function onDataChange() {
    localStorage.setItem("sites", JSON.stringify(bookmarkArr));
    dispalyProducts();
}

function visitsite(index) {
    let url = bookmarkArr[index].url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    window.open(url, '_blank');
}

// function updateSite(index) {
//     isUpdating = true;
//     currentIndex = index;
//     siteNameInput.value = bookmarkArr[index].name;
//     siteUrlInput.value = bookmarkArr[index].url;
// }

function deleteProduct(index) {
    bookmarkArr.splice(index, 1);
    onDataChange();
}
