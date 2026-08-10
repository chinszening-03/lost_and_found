console.log("Lost & Found application loaded");

//lost modal
function openLostModal() {

    const modal =
        document.getElementById("lostModal");

    modal.classList.add("active");
}


function closeLostModal() {

    const modal =
        document.getElementById("lostModal");

    modal.classList.remove("active");
}


//found modal
function openFoundModal() {

    const modal =
        document.getElementById("foundModal");

    modal.classList.add("active");
}


function closeFoundModal() {

    const modal =
        document.getElementById("foundModal");

    modal.classList.remove("active");
}


//close when click outside
window.addEventListener("click", function (event) {

    const lostModal =
        document.getElementById("lostModal");

    const foundModal =
        document.getElementById("foundModal");


    if (event.target === lostModal) {

        closeLostModal();

    }


    if (event.target === foundModal) {

        closeFoundModal();

    }

});

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


//report lost form
const lostForm =
    document.getElementById("lostItemForm");


if (lostForm) {

    lostForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(
                "Lost item submitted! Backend connection will be added next."
            );


            lostForm.reset();

            closeLostModal();

        }
    );

}



//report found item
const foundForm =
    document.getElementById("foundItemForm");


if (foundForm) {

    foundForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            alert(
                "Found item submitted! Backend connection will be added next."
            );


            foundForm.reset();

            closeFoundModal();

        }
    );
}


