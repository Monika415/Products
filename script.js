// ========================================
// CART
// ========================================

let cart = [];


// ADD TO CART

function addToCart(name, price) {

    let existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    displayCart();

    alert(name + " added to cart!");
}


// DISPLAY CART

function displayCart() {

    let cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById("cartTotal").innerText = 0;

        return;
    }


    let total = 0;


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price}
                    </p>

                </div>


                <div class="cart-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    ${item.quantity}

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    });


    document.getElementById("cartTotal").innerText =
        total;
}


// INCREASE

function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();
}


// DECREASE

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    displayCart();
}


// REMOVE

function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}


// ========================================
// CHECKOUT
// ========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total =
        document.getElementById("cartTotal").innerText;


    let address =
        prompt("Enter your delivery address:");

    if (!address) {

        return;
    }


    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Total Amount: ₹" + total +
        "\nDelivery Address: " + address
    );


    cart = [];

    displayCart();
}


// ========================================
// WISHLIST
// ========================================

let wishlist = [];


function addWishlist(name) {

    if (!wishlist.includes(name)) {

        wishlist.push(name);

        displayWishlist();

        alert(name + " added to wishlist ❤️");

    } else {

        alert("Already in wishlist!");
    }
}


function displayWishlist() {

    let wishlistItems =
        document.getElementById("wishlistItems");

    wishlistItems.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p>No products added to wishlist.</p>";

        return;
    }


    wishlist.forEach(function(item, index) {

        wishlistItems.innerHTML += `

            <div class="wishlist-item">

                ❤️ ${item}

                <button
                    onclick="removeWishlist(${index})">

                    Remove

                </button>

            </div>
        `;
    });
}


function removeWishlist(index) {

    wishlist.splice(index, 1);

    displayWishlist();
}


// ========================================
// SEARCH
// ========================================

function searchProducts() {

    let value =
        document.getElementById("searchBox")
            .value
            .toLowerCase();


    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let name =
            product.querySelector("h3")
                .innerText
                .toLowerCase();


        if (name.includes(value)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }

    });
}


// ========================================
// CATEGORY FILTER
// ========================================

function filterProducts(category) {

    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }

    });
}


// ========================================
// SELL PRODUCT
// ========================================

let myListings = [];


document
    .getElementById("sellForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let product = {

            name:
                document.getElementById("productName").value,

            category:
                document.getElementById("productCategory").value,

            condition:
                document.getElementById("productCondition").value,

            price:
                document.getElementById("productPrice").value,

            location:
                document.getElementById("productLocation").value,

            seller:
                document.getElementById("sellerName").value,

            phone:
                document.getElementById("sellerPhone").value,

            image:
                document.getElementById("productImage").value,

            description:
                document.getElementById("productDescription").value

        };


        myListings.push(product);


        displayListings();


        alert(
            "🎉 Your product has been listed successfully!"
        );


        document
            .getElementById("sellForm")
            .reset();


        document
            .querySelector(".listings")
            .scrollIntoView();

    });


// DISPLAY MY LISTINGS

function displayListings() {

    let container =
        document.getElementById("myListings");

    container.innerHTML = "";


    myListings.forEach(function(product, index) {

        container.innerHTML += `

            <div class="listing-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                    </p>

                    <p>
                        ${product.condition}
                    </p>

                    <p>
                        📍 ${product.location}
                    </p>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteListing(${index})">

                    Delete

                </button>

            </div>
        `;
    });
}


// DELETE LISTING

function deleteListing(index) {

    myListings.splice(index, 1);

    displayListings();

    alert("Product listing deleted.");
}


// ========================================
// CONTACT SELLER
// ========================================

function contactSeller(productName) {

    alert(
        "💬 Contact Seller\n\n" +
        "Product: " + productName +
        "\n\nSeller contact details will appear here."
    );
}


// ========================================
// NAVIGATION
// ========================================

function goToProducts() {

    document
        .getElementById("products")
        .scrollIntoView();
}


function goToSell() {

    document
        .getElementById("sell")
        .scrollIntoView();
              }
