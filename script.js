
   
            let cart = [];
            let total = 0;
           
            function addToCart(productId) {
            // Add product to cart
            let productPrice;
            switch (productId) {
            case 1:
            productPrice = 100;
            break;
            case 2:
            productPrice = 200;
            break;
            case 3:
            productPrice = 300;
            case 4:
            productPrice = 500;
            break;
            default:
            productPrice = 0;
            }
            cart.push({id: productId, price: productPrice, quantity: 1});
            updateCart();
            }
           
            function updateCart() {
            total = 0;
            for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
            }
            total += 60; // Delivery charges
            $('.navbar-nav .cart-badge').text(cart.length);
            $('.navbar-nav .cart-total').text('$' + total.toFixed(2));
            displayCart();
            }
           
            function displayCart() {
            $('#cart-container').show();
            let cartItems = '';
            for (let i = 0; i < cart.length; i++) {
            cartItems += `
            <tr>
            <td>Product ${cart[i].id}</td>
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
            $('.cart-total-value').text('$' + total.toFixed(2));
            }
           
            function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            }
           
            function hideCart() {
            $('#cart-container').hide();
            }
  