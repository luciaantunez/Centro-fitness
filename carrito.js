document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("productosAgregados");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach(producto => {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
<a href="${producto.link || '#'}">
  <img src="${producto.imagen || 'img/carrito_ejemplo.jpeg'}" alt="${producto.nombre}">
</a>
<div class="item-details">
    <p>${producto.nombre}</p>
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

 const botonesEliminar = document.querySelectorAll(".item-remove");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.currentTarget.getAttribute("data-index");
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            location.reload(); // recarga la página para actualizar visualmente
        });
    });

let total = 0;

document.querySelectorAll(".item-price p").forEach(p => {
    const valor = parseFloat(p.innerText.replace("USD", "").trim());
    if (!isNaN(valor)) total += valor;
});
const totalDiv = document.getElementById("totalCarrito");
totalDiv.innerHTML = `<p><strong>Total: ${total.toFixed(2)} USD</strong></p>`;

});

