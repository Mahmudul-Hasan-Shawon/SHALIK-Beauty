let cart = [];
let total = 0;
let deliveryChargeInsideDhaka = 60;
let deliveryChargeOutsideDhaka = 100; // Assuming outside Dhaka charge is different

function updateCart() {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    let deliveryCharge = ($('#delivery-location').val() === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    total += deliveryCharge;
    $('#cart-total').text('$' + total.toFixed(2));
    $('#cart-total-value').text('$' + total.toFixed(2));
}

function displayCart() {
    let cartItems = '';
    for (let i = 0; i < cart.length; i++) {
        let productName = $(`[data-id="${cart[i].id}"]`).text();
        cartItems += `
            <tr>
                <td>${productName}</td>
                <td>$${cart[i].price.toFixed(2)}</td>
                <td>${cart[i].quantity}</td>
                <td>$${(cart[i].price * cart[i].quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button>
                </td>
            </tr>
        `;
    }
    $('#cart-items').html(cartItems);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    displayCart();
}

function updateDeliveryCharge() {
    let selectedLocation = $('#delivery-location').val();
    let deliveryCharge = (selectedLocation === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    $('#delivery-charge').text('$' + deliveryCharge.toFixed(2));
    updateCart();
}

// Call updateCart initially to set default delivery charge and display cart items
updateCart();
displayCart();
