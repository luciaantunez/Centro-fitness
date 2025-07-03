// checkout.js
import { guardarPedidoEnFirebase, obtenerProductosDesdeFirestore } from "./firebase.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// Calcula el total usando precios reales desde Firestore
async function calcularTotalDesdeFirestore() {
  try {
    const productosFirebase = await obtenerProductosDesdeFirestore();
    total = 0;

    carrito.forEach(item => {
      const producto = productosFirebase.find(p => p.nombre === item.nombre);
      if (producto) {
        total += producto.precio;
      } else {
        console.warn(`Producto no encontrado en Firestore: ${item.nombre}`);
      }
    });

    mostrarTotalEnPantalla(total);
    inicializarBotonesPaypal(total);
  } catch (error) {
    console.error("Error al calcular total:", error);
  }
}

// Muestra el total en el HTML
function mostrarTotalEnPantalla(total) {
  const totalSpan = document.getElementById("total-monto");
  if (totalSpan) {
    totalSpan.textContent = `$${total.toFixed(2)} USD`;
  }
}

// Inicializa los botones de PayPal con el total calculado
function inicializarBotonesPaypal(total) {
  paypalUSD.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },
    onApprove: async (data, actions) => {
      const details = await actions.order.capture();
      const pedido = {
        cliente: details.payer.name.given_name + " " + details.payer.name.surname,
        email: details.payer.email_address,
        productos: carrito,
        total: total,
        fecha: new Date().toISOString()
      };

      await guardarPedidoEnFirebase(pedido);
      alert("Pago exitoso, gracias " + details.payer.name.given_name);
      localStorage.removeItem("carrito");
      window.location.href = "gracias.html";
    }
  }).render("#paypal-button-container");
}

// Al cargar la página, lee el carrito y calcula el total
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  calcularTotalDesdeFirestore();
});
