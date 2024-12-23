document.addEventListener('DOMContentLoaded', function () {
    let totalPrice = 0;
    let cartItems = [];

    // DOM Elements for Cart
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');
    
    // Open the cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    // Close the cart modal
    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Function to update total price and cart item count
    const updateCart = () => {
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        cartItemCount.textContent = cartItems.length;
    };

    // Add "Buy Now" functionality
    document.querySelectorAll('.buy_now').forEach(button => {
        button.addEventListener('click', function () {
            const product = this.closest('.product');
            const itemName = product.getAttribute('data-name');
            const itemPrice = parseFloat(product.getAttribute('data-price'));
            
            // Prevent buying the same item again
            if (this.hasAttribute('disabled')) return;

            // Add item to cart
            cartItems.push({ name: itemName, price: itemPrice });
            totalPrice += itemPrice;

            // Disable the "Add to Cart" button and change text
            this.setAttribute('disabled', true);
            this.textContent = "Added to Cart";
            this.style.backgroundColor = "#4CAF50"; // Green color

            // Add item to cart modal
            const cartItem = document.createElement('li');
            cartItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;

            // Add a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                // Remove item from cart
                cartItems = cartItems.filter(item => item.name !== itemName || item.price !== itemPrice);
                totalPrice -= itemPrice;

                // Update cart display
                cartItem.remove();
                updateCart();

                // Re-enable the "Buy Now" button
                const productDiv = document.querySelector(`.product[data-name="${itemName}"]`);
                const buyButton = productDiv.querySelector('.buy_now');
                buyButton.removeAttribute('disabled');
                buyButton.textContent = 'Add to Cart';
                buyButton.style.backgroundColor = ""; // Reset color
            });

            cartItem.appendChild(removeButton);
            cartItemsList.appendChild(cartItem);

            // Update cart count and total
            updateCart();
        });
    });

    // Handle "See More" button functionality
    document.querySelectorAll('.see_more').forEach(link => {
        link.addEventListener('click', function () {
            const productDiv = this.closest('.product');
            const description = productDiv.querySelector('.product-description');
            
            // Toggle description visibility
            description.style.display = description.style.display === 'none' || description.style.display === '' ? 'block' : 'none';
        });
    });

    // Checkout Button
    checkoutButton.addEventListener('click', () => {
        alert(`Your total is $${totalPrice.toFixed(2)}. Thank you for shopping!`);

        // Clear cart after checkout
        cartItems = [];
        cartItemsList.innerHTML = '';
        totalPrice = 0;
        updateCart();

        // Close the cart modal
        cartModal.style.display = 'none';
    });
});
document.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    // Prevents navigation
});

