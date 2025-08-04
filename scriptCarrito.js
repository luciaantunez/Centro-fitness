let cart = [];
let totalPrice = 0;

function addToCart(productName, productPrice) {
    // Añadir producto al carrito
    cart.push({ name: productName, price: productPrice });
    
    // Actualizar total del carrito
    totalPrice += productPrice;
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceDisplay = document.getElementById('total-price');
    
    // Limpiar la lista de elementos del carrito
    cartItems.innerHTML = '';
    
    // Añadir cada producto del carrito a la lista
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    
    // Actualizar el total del precio
    totalPriceDisplay.textContent = totalPrice.toFixed(2);
}