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

    const itemDetailsModal =
    document.getElementById("itemDetailsModal");

    if (event.target === itemDetailsModal) {

        closeItemDetails();
    }

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

if (searchButton && searchInput) {

    searchButton.addEventListener(
        "click",
        searchItems
    );


    // Allow pressing Enter to search

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchItems();

            }

        }
    );

}


async function searchItems() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    // If search is empty, show everything again

    if (keyword === "") {

        loadItems();

        return;

    }


    try {

        const response =
            await fetch("/api/items");


        if (!response.ok) {

            throw new Error(
                "Failed to search items"
            );

        }


        const items =
            await response.json();


        // Search by title, category,
        // location, description and type

        const filteredItems =
            items.filter(function (item) {

                return (

                    (item.title || "")
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    (item.category || "")
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    (item.location || "")
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    (item.description || "")
                        .toLowerCase()
                        .includes(keyword)

                    ||

                    (item.type || "")
                        .toLowerCase()
                        .includes(keyword)

                );

            });


        displayItems(filteredItems);


        console.log(
            "Search results:",
            filteredItems
        );


    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        alert(
            "Unable to search items."
        );

    }

}

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

            addItemToPage(savedItem);

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

            addItemToPage(savedItem);

            alert("Found item submitted successfully!");

            foundForm.reset();
            closeFoundModal();

        } catch (error) {

            console.error("Error:", error);

            alert("Unable to submit found item.");

        }
    });
}

// Load items from backend
async function loadItems() {

    try {

        const response = await fetch("/api/items");

        if (!response.ok) {
            throw new Error("Failed to load items");
        }

        const items = await response.json();

        console.log("Items from database:", items);

        displayItems(items);

    } catch (error) {

        console.error("Error loading items:", error);

    }
}

function displayItems(items) {

    const itemsGrid = document.querySelector(".items-grid");

    if (!itemsGrid) {
        return;
    }

    itemsGrid.innerHTML = "";

    items.forEach(function (item) {

        const card = createItemCard(item);

        itemsGrid.appendChild(card);
    });
}

function addItemToPage(item) {

    const itemsGrid = document.querySelector(".items-grid");

    if (!itemsGrid) {
        return;
    }

    const card = createItemCard(item);

    itemsGrid.prepend(card);
}

function createItemCard(item) {

    const card = document.createElement("div");

    card.classList.add("item-card");

    if (item.type === "LOST") {
        card.classList.add("lost-card");
    } else {
        card.classList.add("found-card");
    }

    card.innerHTML = `
        <div class="item-top">

            <span class="item-type ${item.type.toLowerCase()}">
                ${item.type}
            </span>

            <span class="item-date">
                ${item.date || ""}
            </span>

        </div>

        <div class="item-icon">
            ${item.type === "LOST" ? "🔍" : "✓"}
        </div>

        <h3>${item.title}</h3>

        <p class="category">
            ${item.category || ""}
        </p>

        <p class="location">
            📍 ${item.location || ""}
        </p>

        <button class="details-btn">
            View Details
        </button>
    `;

    // Connect View Details button
    const detailsButton = card.querySelector(".details-btn");

    detailsButton.addEventListener("click", function () {
        openItemDetails(item);
    });

    return card;
}

function openItemDetails(item) {

    const modal =
        document.getElementById(
            "itemDetailsModal"
        );


    const modalContent =
        modal.querySelector(
            ".modal-content"
        );


    // Title

    document.getElementById(
        "detailsTitle"
    ).textContent =
        item.title || "Unknown Item";


    // Category

    document.getElementById(
        "detailsCategory"
    ).textContent =
        item.category || "Not provided";


    // Location

    document.getElementById(
        "detailsLocation"
    ).textContent =
        item.location || "Not provided";


    // Date

    document.getElementById(
        "detailsItemDate"
    ).textContent =
        item.date || "Not provided";


    // Description

    document.getElementById(
        "detailsDescription"
    ).textContent =
        item.description ||
        "No description provided";


    // Contact

    document.getElementById(
        "detailsContact"
    ).textContent =
        item.contactEmail ||
        "Not provided";


    // Status

    document.getElementById(
        "detailsStatus"
    ).textContent =
        item.status || "OPEN";


    // Header date

    document.getElementById(
        "detailsDate"
    ).textContent =
        item.date || "";


    const label =
        document.getElementById(
            "detailsLabel"
        );


    const icon =
        document.getElementById(
            "detailsIcon"
        );


    // =========================
    // LOST
    // =========================

    if (item.type === "LOST") {

        label.textContent =
            "LOST ITEM";


        label.className =
            "modal-label lost-label";


        icon.textContent =
            "🔍";


        modalContent.classList.remove(
            "found-modal"
        );


        modalContent.classList.add(
            "lost-modal"
        );

    }


    // =========================
    // FOUND
    // =========================

    else {

        label.textContent =
            "FOUND ITEM";


        label.className =
            "modal-label found-label";


        icon.textContent =
            "✓";


        modalContent.classList.remove(
            "lost-modal"
        );


        modalContent.classList.add(
            "found-modal"
        );

    }


    // Open modal

    modal.classList.add(
        "active"
    );;
}


function closeItemDetails() {

    const modal = document.getElementById("itemDetailsModal");

    modal.classList.remove("active");
}

loadItems();
