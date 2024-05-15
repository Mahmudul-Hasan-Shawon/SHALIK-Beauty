let cart = [];
let total = 0;
let deliveryChargeInsideDhaka = 60;
let deliveryChargeOutsideDhaka = 120; // Assuming outside Dhaka charge is different

function addToCart(productId) {
    const productPrices = {
        1: 10,
        2: 20,
        3: 30,
        4: 40,
        5: 50,
        6: 60,
        7: 70,
        8: 80
    };
    const productPrice = productPrices[productId] || 0;
    cart.push({ id: productId, price: productPrice, quantity: 1 });
    updateCart();
}


function updateCart() {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    let deliveryCharge = ($('#delivery-location').val() === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    total += deliveryCharge;
    $('.navbar-nav .cart-badge').text(cart.length);
    $('.navbar-nav .cart-total').text('$' + total.toFixed(2));
    displayCart();
}

function displayCart() {
    $('#cart-container').show();
    let cartItems = '';
    for (let i = 0; i < cart.length; i++) {
        let productName = $(`[data-id="${cart[i].id}"]`).text();
        cartItems += `
            <tr>
                <td>${productName}</td>
                <td>$${cart[i].price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${cart[i].quantity}" onchange="updateQuantity(${i}, this.value)"></td>
                <td>$${(cart[i].price * cart[i].quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button>
                </td>
            </tr>
        `;
    }
    $('#cart-items').html(cartItems);
    
    // Update total in the frontend
    $('.cart-total-value').text('$' + total.toFixed(2));
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    updateCart();
}



function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function hideCart() {
    $('#cart-container').hide();
}

function updateDeliveryCharge() {
    let selectedLocation = $('#delivery-location').val();
    let deliveryCharge = (selectedLocation === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    $('.delivery-charge').text('$' + deliveryCharge.toFixed(2));
    updateCart();
}

// Call updateCart initially to set default delivery charge
updateCart();




function displayCart() {
    $('#cart-container').show();
    let cartItems = '';
    for (let i = 0; i < cart.length; i++) {
        let productName = $(`[data-id="${cart[i].id}"]`).text();
        cartItems += `
            <tr>
                <td>${productName}</td>
                <td>$${cart[i].price.toFixed(2)}</td>
                <td><input type="number" min="1" value="${cart[i].quantity}" onchange="updateQuantity(${i}, this.value)"></td>
                <td>$${(cart[i].price * cart[i].quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button>
                </td>
            </tr>
        `;
    }
    $('#cart-items').html(cartItems);
    
    // Update total in the frontend
    $('.cart-total-value').text('$' + total.toFixed(2));
}
