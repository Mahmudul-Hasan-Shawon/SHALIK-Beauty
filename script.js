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
}

function updateCart() {
    total = 0;
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
        subTotal += cart[i].price * cart[i].quantity;
    }
    let deliveryCharge = ($('#delivery_location').val() === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    total += deliveryCharge;
    $('.cart_badge').text(cart.length);
    $('.cart_total').text(total.toFixed(2) + '৳');
    $('.subtotal_value').text(subTotal.toFixed(2) + '৳');
    
    // Show or hide checkout button based on subtotal
    if (subTotal > 0) {
        $('#checkout_button').show();
    } else {
        $('#checkout_button').hide();
    }

    displayCart();
}

function displayCart() {
    let cartItems = '';
    for (let i = 0; i < cart.length; i++) {
        let productName = $(`[data-id="${cart[i].id}"]`).text();
        cartItems += `
            <tr>
                <td class="product_name">${productName}</td>
                <td class="price_table">${cart[i].price.toFixed(2)} ৳</td>
                <td><input type="number" min="1" value="${cart[i].quantity}" onchange="updateQuantity(${i}, this.value)" class="quantity_input"></td>
                <td class="subtotal">${(cart[i].price * cart[i].quantity).toFixed(2)} ৳</td>
                <td>
                    <button class="btn-x-mark" onclick="removeFromCart(${i})"><i class="fa-solid fa-xmark"></i></button>
                </td>
            </tr>
        `;
    }
    $('#cart_items').html(cartItems);
    $('.cart_total_value').text(total.toFixed(2) + '৳');
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
    let selectedLocation = $('#delivery_location').val();
    let deliveryCharge = (selectedLocation === 'inside') ? deliveryChargeInsideDhaka : deliveryChargeOutsideDhaka;
    $('.delivery_charge').text(deliveryCharge.toFixed(2) + '৳');
    updateCart();
}

// Call updateCart initially to set default delivery charge
updateCart();

function showCheckout() {
    document.getElementById('cart_content').style.display = 'none';
    document.getElementById('checkout_form').style.display = 'block';
}

function hideCart() {
    document.getElementById('cart_content').style.display = 'block';
    document.getElementById('checkout_form').style.display = 'none';
}
