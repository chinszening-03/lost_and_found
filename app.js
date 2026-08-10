console.log("Lost & Found application loaded");


//search
const searchButton =
    document.getElementById("searchButton");

const searchInput =
    document.getElementById("searchInput");


searchButton.addEventListener("click", function () {

    const keyword =
        searchInput.value.trim();

    if (keyword === "") {

        alert("Please enter an item to search.");

        return;
    }

    alert(
        "Search functionality will be connected to the Java backend."
    );

});


//report lost item
const reportLostButton =
    document.querySelector(".primary-btn");


reportLostButton.addEventListener("click", function () {

    alert(
        "Report Lost Item page will be added next."
    );

});


//report found item
const reportFoundButton =
    document.querySelector(".secondary-btn");


reportFoundButton.addEventListener("click", function () {

    alert(
        "Report Found Item page will be added next."
    );

});


//details
const detailButtons =
    document.querySelectorAll(".details-btn");


detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert(
            "Item details page will be added next."
        );

    });

});