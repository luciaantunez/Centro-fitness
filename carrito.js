document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("productosAgregados");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
<img src="${producto.imagen || 'img/carrito_ejemplo.jpeg'}" alt="${producto.nombre}">
<div class="item-details">
    <p>${producto.nombre}</p>
</div>
<div class="item-quantity">
    <input type="number" value="1" min="1">
</div>
<div class="item-price">
    <p>${producto.precio} USD</p>
</div>
<div class="item-remove">
    <i class="fas fa-trash"></i>
</div>
      `;

        cartContainer.appendChild(item);
    });
});