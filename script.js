const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");


// ===============================
// NOTIFICATION
// ===============================

function showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    notificationText.textContent = message;
    notification.style.display = "flex";

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(function () {
        notification.style.display = "none";
    }, 3000);
}


function closeNotification() {
    document.getElementById("notification").style.display = "none";
}


// ===============================
// EXPLORE PRODUCTS
// ===============================

function exploreProducts() {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// BUY PRODUCT
// ===============================

function buyProduct(productName) {

    showNotification(
        productName + " added to your cart!"
    );

}


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();

    filterProducts(searchValue);

}


// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory() {

    const searchValue = searchInput.value.toLowerCase().trim();

    filterProducts(searchValue);

}


// ===============================
// COMMON FILTER FUNCTION
// ===============================

function filterProducts(searchValue) {

    const selectedCategory = categorySelect.value;

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function (card) {

        const productName =
            card.dataset.name.toLowerCase();

        const productCategory =
            card.dataset.category;

        const matchesSearch =
            productName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory ||
            productCategory === "all";

        if (matchesSearch && matchesCategory) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}


// ===============================
// ADD PRODUCT
// ===============================

function addProduct() {

    const name =
        document.getElementById("productName").value.trim();

    const price =
        document.getElementById("productPrice").value.trim();

    const condition =
        document.getElementById("productCondition").value.trim();

    const image =
        document.getElementById("productImage").value.trim();


    // Validate required fields

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


    // Check valid price

    if (Number(price) <= 0) {

        showNotification(
            "Please enter a valid price!"
        );

        return;
    }


    // Default image

    let imageURL = image;

    if (imageURL === "") {

        imageURL =
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80";

    }


    // Create product card

    const productCard =
        document.createElement("div");

    productCard.className = "product-card";

    /*
        New products are given "all"
        so they will be visible in
        All Categories.
    */

    productCard.dataset.category = "all";

    productCard.dataset.name = name;


    // Create image

    const productImage =
        document.createElement("img");

    productImage.src = imageURL;

    productImage.alt = name;


    // Product info container

    const productInfo =
        document.createElement("div");

    productInfo.className = "product-info";


    // Product name

    const productTitle =
        document.createElement("h3");

    productTitle.textContent = name;


    // Condition

    const productCondition =
        document.createElement("p");

    productCondition.textContent = condition;


    // Price

    const productPrice =
        document.createElement("strong");

    productPrice.textContent =
        "₹" + Number(price).toLocaleString("en-IN");


    // Buy button

    const buyButton =
        document.createElement("button");

    buyButton.innerHTML =
        '<i class="fa-solid fa-cart-shopping"></i> Buy Now';


    // Important:
    // Direct event listener instead of inline onclick

    buyButton.addEventListener("click", function () {

        buyProduct(name);

    });


    // Add elements

    productInfo.appendChild(productTitle);

    productInfo.appendChild(productCondition);

    productInfo.appendChild(productPrice);

    productInfo.appendChild(buyButton);


    productCard.appendChild(productImage);

    productCard.appendChild(productInfo);


    // Add new product to grid

    productsGrid.appendChild(productCard);


    // Clear form

    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("productCondition").value = "";

    document.getElementById("productImage").value = "";


    // Show success message

    showNotification(
        "Product added for sale successfully!"
    );


    // Scroll to newly added product

    productCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ===============================
// ENTER KEY SEARCH
// ===============================

searchInput.addEventListener(
    "keyup",
    function (event) {

        if (event.key === "Enter") {

            searchProducts();

        }

    }
);
