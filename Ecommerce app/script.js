document.addEventListener('DOMContentLoaded', () => {
    // Restructured products with categories and brands
    const categories = {
        Laptop: [
            { id: 101, name: 'Dell XPS 13', price: 115000 },
            { id: 102, name: 'HP Spectre x360', price: 125000 }
        ],
        Smartphone: [
            { id: 201, name: 'iPhone 15', price: 79900 },
            { id: 202, name: 'Samsung S24', price: 74999 }
        ],
        Headphones: [
            { id: 301, name: 'Sony WH-1000XM5', price: 29990 },
            { id: 302, name: 'Bose QC45', price: 26500 }
        ]
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Create Category Dropdowns
    Object.keys(categories).forEach(catName => {
        const catDiv = document.createElement('div');
        catDiv.classList.add('category-section');
        
        catDiv.innerHTML = `
            <h3>${catName}</h3>
            <div class="product-controls">
                <select id="select-${catName}">
                    ${categories[catName].map(p => `<option value="${p.id}">${p.name} - ₹${p.price.toLocaleString('en-IN')}</option>`).join('')}
                </select>
                <button class="add-btn" data-category="${catName}">Add to Cart</button>
            </div>
        `;
        productList.appendChild(catDiv);
    });

    // Event Listener for Add Buttons
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const category = e.target.getAttribute('data-category');
            const selectElement = document.getElementById(`select-${category}`);
            const productId = parseInt(selectElement.value);
            
            // Find product within that specific category
            const product = categories[category].find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push({ ...product, cartId: Date.now() });
        saveAndRender();
    }

    window.removeFromCart = (cartId) => {
        cart = cart.filter(item => item.cartId !== cartId);
        saveAndRender();
    };

    function saveAndRender() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');

            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} - ₹${item.price.toLocaleString('en-IN')}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.cartId})">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
        }
    }

    checkoutBtn.addEventListener('click', () => {
        if(cart.length === 0) return;
        alert('Order Placed! Thank you for your purchase.');
        cart = [];
        saveAndRender();
    });

    renderCart();
});