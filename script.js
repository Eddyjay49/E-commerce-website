
let Arrproducts = [
    { id: 1, name: "Ladies' shoe", image: "Images/Ladies'Shoe.jpeg", price: "$100", rating: 4 },
    { id: 2, name: "motorcycle", image: "Images/motorcycle.jpeg", price: "$150", rating: 4 },
    { id: 3, name: "car", image: "Images/mottor.jpeg", price: "$250", rating: 5 },
    { id: 4, name: "Phone", image: "Images/Phone.jpeg", price: "$100", rating: 4 },
    { id: 5, name: "Suit", image: "Images/Suit.jpeg", price: "$100", rating: 4 },
    { id: 6, name: "smart watch", image: "Images/Watch.jpeg", price: "$50", rating: 3 },
];

const body = document.querySelector("body");
const products = document.querySelector(".products");
const shoppingBasket = document.querySelector(".shoppingBasket");
const productList = document.querySelector(".productList");
const subtotalElement = document.querySelector(".subtotal");
const basketQuantity = document.querySelector(".quantity");
let checkOutList = [];

shoppingBasket.onclick = () => {
    body.classList.add("active");
};

const closeButton = document.querySelector(".close");
closeButton.onclick = () => {
    body.classList.remove("active");
};

function onInIt() {
    Arrproducts.forEach((item, key) => {
        let div = document.createElement("div");
        div.classList.add("item");

        let star = "";
        for (let i = 0; i < item.rating; i++) {
            star += `<i class="fa fa-star"></i>`;
        }

        div.innerHTML = `
            <img src="${item.image}"/>
            <div class="name">${item.name}</div>
            <div>${star}</div>
            <div class="price"><small></small>${item.price}</div>
            <button onclick="addTocart(${key})"><i class="fa fa-cart-plus"></i>Add to cart</button>
        `;
        products.appendChild(div);
    });
}

onInIt();

function addTocart(id) {
    let item = checkOutList.find(cartItem => cartItem.id === Arrproducts[id].id);

    if (item) {
        // If item already exists, increase quantity
        item.quantity += 1;
    } else {
        // If item is new, add it to the cart with a quantity of 1
        let product = { ...Arrproducts[id], quantity: 1 };
        checkOutList.push(product);
    }
    reloadCart();
}

function reloadCart() {
    productList.innerHTML = "";

    checkOutList.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}">
            <div>${item.name}</div>
            <div>${item.price}</div>
            <div>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <div>${item.quantity}</div>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
        `;
        productList.appendChild(li);
    });

    // Update the subtotal display with the total price and item count
    const totalPrice = calculateTotalPrice();
    const totalItems = calculateTotalItems();
    subtotalElement.innerHTML = `Subtotal (${totalItems} items): $${totalPrice}`;

    // Update the basket quantity display
    basketQuantity.innerHTML = totalItems;
}

function calculateTotalPrice() {
    let totalPrice = 0;
    
    checkOutList.forEach((item) => {
        let itemPrice = parseFloat(item.price.replace('$', ''));
        totalPrice += itemPrice * item.quantity;
    });

    return totalPrice.toFixed(2); // Returns the total price as a string with two decimal places
}

function calculateTotalItems() {
    let totalItems = 0;
    
    checkOutList.forEach((item) => {
        totalItems += item.quantity;
    });

    return totalItems;
}

function increaseQuantity(id) {
    let item = checkOutList.find(cartItem => cartItem.id === id);
    if (item) {
        item.quantity += 1;
        reloadCart();
    }
}

function decreaseQuantity(id) {
    let item = checkOutList.find(cartItem => cartItem.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        // Remove item from cart if quantity is 0
        checkOutList = checkOutList.filter(cartItem => cartItem.id !== id);
    }
    reloadCart();
}
