let cart = [];
let total = 0;
let deliveryChargeInsideDhaka = 60;
let deliveryChargeOutsideDhaka = 120;

function addToCart(productId) {
    const productPrices = {
        1: 10,
        2: 20,
        3: 30,
        4: 40,
        5: 50,
        6: 60,
        7: 70,
        8: 80,
        9: 90,
        10: 100,
        11: 110,
        12: 120,
    };
    const productPrice = productPrices[productId] || 0;
    
    // Check if the product is already in the cart
    let productExists = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity += 1; // Increase the quantity
            productExists = true;
            break;
        }
    }
    
    // If product does not exist in the cart, add it as a new item
    if (!productExists) {
        cart.push({ id: productId, price: productPrice, quantity: 1 });
    }
    
    updateCart();

    // Show the cart modal
    let cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function updateCart() {
    total = 0;
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
        subTotal += cart[i].price * cart[i].quantity;
    }
    let deliveryCharge = ($('#delivery-location').val() === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    total += deliveryCharge;
    $('.cart-badge').text(cart.length);
    $('.cart-total').text(total.toFixed(2) + '৳');
    $('.subtotal-value').text(subTotal.toFixed(2) + '৳');
    
    displayCart();
}

function displayCart() {
    let cartItems = '';
    for (let i = 0; i < cart.length; i++) {
        let productName = $(`[data-id="${cart[i].id}"]`).text();
        cartItems += `
            <tr>
                <td class="product-name">${productName}</td>
                <td class="price-table">${cart[i].price.toFixed(2)} ৳</td>
                <td><input type="number" min="1" value="${cart[i].quantity}" onchange="updateQuantity(${i}, this.value)" class="quantity-input"></td>
                <td class="subtotal">${(cart[i].price * cart[i].quantity).toFixed(2)} ৳</td>
                <td>
                    <button class="btn-x-mark" onclick="removeFromCart(${i})" class="btn-fa-xmark"><i class="fa-solid fa-xmark"></i></button>
                </td>
            </tr>
        `;
    }
    $('#cart-items').html(cartItems);
    $('.cart-total-value').text(total.toFixed(2) + '৳');
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateDeliveryCharge() {
    let selectedLocation = $('#delivery-location').val();
    let deliveryCharge = (selectedLocation === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    $('.delivery-charge').text(deliveryCharge.toFixed(2) + '৳');
    updateCart();
}

// Call updateCart initially to set default delivery charge
updateCart();
