// ==========================================
// GET HTML ELEMENTS
// ==========================================

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");


// ==========================================
// NOTIFICATION
// ==========================================

function showNotification(message) {

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");

    notificationText.textContent = message;

    notification.style.display = "flex";

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(function () {

        notification.style.display = "none";

    }, 3000);
}


// ==========================================
// CLOSE NOTIFICATION
// ==========================================

function closeNotification() {

    const notification =
        document.getElementById("notification");

    notification.style.display = "none";
}


// ==========================================
// EXPLORE PRODUCTS
// ==========================================

function exploreProducts() {

    const productsSection =
        document.getElementById("products");

    productsSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// BUY NOW
// ==========================================

function buyProduct(productName) {

    const answer = confirm(
        "Do you want to buy " + productName + "?"
    );

    if (answer === true) {

        showNotification(
            productName +
            " purchased successfully!"
        );

    } else {

        showNotification(
            "Purchase cancelled."
        );

    }
}


// ==========================================
// CONNECT EXISTING BUY BUTTONS
// ==========================================

function connectBuyButtons() {

    const buyButtons =
        document.querySelectorAll(".buy-btn");

    buyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card =
                button.closest(".product-card");

            if (!card) {
                return;
            }

            const productName =
                card.dataset.name;

            buyProduct(productName);

        });

    });

}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();

    filterProducts(searchValue);
}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory() {

    const searchValue =
        searchInput.value
        .toLowerCase()
        .trim();

    filterProducts(searchValue);
}


// ==========================================
// FILTER PRODUCTS
// ==========================================

function filterProducts(searchValue) {

    const selectedCategory =
        categorySelect.value;

    const cards =
        document.querySelectorAll(".product-card");


    cards.forEach(function (card) {

        const productName =
            card.dataset.name
            .toLowerCase();

        const productCategory =
            card.dataset.category;


        const matchesSearch =
            productName.includes(searchValue);


        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory ||
            productCategory === "all";


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });
}


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct() {

    const name =
        document
        .getElementById("productName")
        .value
        .trim();


    const price =
        document
        .getElementById("productPrice")
        .value
        .trim();


    const condition =
        document
        .getElementById("productCondition")
        .value
        .trim();


    const image =
        document
        .getElementById("productImage")
        .value
        .trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (
        name === "" ||
        price === "" ||
        condition === ""
    ) {

        showNotification(
            "Please fill all required fields!"
        );

        return;
    }


    if (Number(price) <= 0) {

        showNotification(
            "Please enter a valid price!"
        );

        return;
    }


    // ======================================
    // DEFAULT IMAGE
    // ======================================

    let imageURL = image;


    if (imageURL === "") {

        imageURL =
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80";
    }


    // ======================================
    // CREATE PRODUCT CARD
    // ======================================

    const productCard =
        document.createElement("div");


    productCard.className =
        "product-card";


    productCard.dataset.category =
        "all";


    productCard.dataset.name =
        name;


    // ======================================
    // IMAGE
    // ======================================

    const productImage =
        document.createElement("img");


    productImage.src =
        imageURL;


    productImage.alt =
        name;


    // ======================================
    // PRODUCT INFO
    // ======================================

    const productInfo =
        document.createElement("div");


    productInfo.className =
        "product-info";


    // ======================================
    // PRODUCT NAME
    // ======================================

    const productTitle =
        document.createElement("h3");


    productTitle.textContent =
        name;


    // ======================================
    // CONDITION
    // ======================================

    const productCondition =
        document.createElement("p");


    productCondition.textContent =
        condition;


    // ======================================
    // PRICE
    // ======================================

    const productPrice =
        document.createElement("strong");


    productPrice.textContent =
        "₹" +
        Number(price).toLocaleString("en-IN");


    // ======================================
    // BUY NOW BUTTON
    // ======================================

    const buyButton =
        document.createElement("button");


    buyButton.type = "button";

    buyButton.className = "buy-btn";


    buyButton.innerHTML =
        '<i class="fa-solid fa-cart-shopping"></i> Buy Now';


    // ======================================
    // BUY BUTTON EVENT
    // ======================================

    buyButton.addEventListener(
        "click",
        function () {

            buyProduct(name);

        }
    );


    // ======================================
    // ADD CONTENT TO PRODUCT INFO
    // ======================================

    productInfo.appendChild(
        productTitle
    );


    productInfo.appendChild(
        productCondition
    );


    productInfo.appendChild(
        productPrice
    );


    productInfo.appendChild(
        buyButton
    );


    // ======================================
    // ADD CONTENT TO CARD
    // ======================================

    productCard.appendChild(
        productImage
    );


    productCard.appendChild(
        productInfo
    );


    // ======================================
    // ADD CARD TO PAGE
    // ======================================

    productsGrid.appendChild(
        productCard
    );


    // ======================================
    // CLEAR INPUTS
    // ======================================

    document
        .getElementById("productName")
        .value = "";


    document
        .getElementById("productPrice")
        .value = "";


    document
        .getElementById("productCondition")
        .value = "";


    document
        .getElementById("productImage")
        .value = "";


    // ======================================
    // SUCCESS MESSAGE
    // ======================================

    showNotification(
        "Product added for sale successfully!"
    );


    // ======================================
    // SCROLL TO NEW PRODUCT
    // ======================================

    productCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ==========================================
// SEARCH USING ENTER KEY
// ==========================================

searchInput.addEventListener(
    "keyup",
    function (event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);


// ==========================================
// START APPLICATION
// ==========================================

connectBuyButtons();
