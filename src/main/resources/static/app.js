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
const lostForm = document.getElementById("lostItemForm");

if (lostForm) {
    lostForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = new FormData(lostForm);

        const item = {
            type: "LOST",
            title: formData.get("title"),
            category: formData.get("category"),
            description: formData.get("description"),
            location: formData.get("location"),
            date: formData.get("date"),
            contactEmail: formData.get("contactEmail")
        };

        try {

            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error("Failed to submit lost item");
            }

            const savedItem = await response.json();

            console.log("Lost item saved:", savedItem);

            alert("Lost item submitted successfully!");

            lostForm.reset();
            closeLostModal();

        } catch (error) {

            console.error("Error:", error);

            alert("Unable to submit lost item.");

        }
    });
}



//report found item
const foundForm = document.getElementById("foundItemForm");

if (foundForm) {
    foundForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const formData = new FormData(foundForm);

        const item = {
            type: "FOUND",
            title: formData.get("title"),
            category: formData.get("category"),
            description: formData.get("description"),
            location: formData.get("location"),
            date: formData.get("date"),
            contactEmail: formData.get("contactEmail")
        };

        try {

            const response = await fetch("/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error("Failed to submit found item");
            }

            const savedItem = await response.json();

            console.log("Found item saved:", savedItem);

            alert("Found item submitted successfully!");

            foundForm.reset();
            closeFoundModal();

        } catch (error) {

            console.error("Error:", error);

            alert("Unable to submit found item.");

        }
    });
}