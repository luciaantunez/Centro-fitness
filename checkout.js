import { guardarPedidoEnFirebase, obtenerProductosDesdeFirestore } from "./firebase.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalGlobal = 0;  // guardamos total global para usar en modal y PayPal
let customId = null;

// Referencias DOM
const formulario = document.getElementById('formulario-asesoria');
const modal = document.getElementById('paypalModal');
const modalClose = document.getElementById('modalClose');
const resumenPago = document.getElementById('resumenPago');
const paypalContainerModal = document.getElementById('paypal-button-container-modal');

// Calcula el total usando precios reales desde Firestore
async function calcularTotalDesdeFirestore() {
  try {
    const productosFirebase = await obtenerProductosDesdeFirestore();
    totalGlobal = 0;

    carrito.forEach(item => {
      const producto = productosFirebase.find(p => p.nombre === item.nombre);
      if (producto) {
        totalGlobal += producto.precio;
      } else {
        console.warn(`Producto no encontrado en Firestore: ${item.nombre}`);
      }
    });

    mostrarTotalEnPantalla(totalGlobal);
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

// Maneja el submit del formulario, valida y muestra modal con PayPal
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  // Leer datos del formulario
  const nombre = formulario.querySelector('#nombre').value.trim();
  const apellido = formulario.querySelector('#apellido').value.trim();
  const email = formulario.querySelector('#email').value.trim();
  const telefono = formulario.querySelector('#telefono').value.trim();
  const mensaje = formulario.querySelector('#mensaje').value.trim();

  // Generar customId para identificar pedido
  customId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now();

  // Guardar datos en backend (Firebase Function)
  try {
    const res = await fetch('https://us-central1-TU_PROYECTO.cloudfunctions.net/guardarFormulario', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ customId, nombre, apellido, email, telefono, mensaje })
    });
    if (!res.ok) throw new Error(await res.text());
  } catch (err) {
    alert('Error guardando datos: ' + err.message);
    return;
  }

  // Mostrar resumen en el modal
  resumenPago.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Mensaje:</strong> ${mensaje || 'No proporcionado'}</p>
    <p><strong>Monto a pagar:</strong> $${totalGlobal.toFixed(2)} USD</p>
  `;

  // Mostrar modal
  modal.style.display = 'flex';

  // Renderizar botón PayPal si no está renderizado
  if (!paypalContainerModal.hasChildNodes()) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: totalGlobal.toFixed(2) },
            custom_id: customId
          }]
        });
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();

        // Notificar a entrenador y guardar pedido con datos de pago
        await fetch('https://us-central1-TU_PROYECTO.cloudfunctions.net/notifyEntrenador', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            orderID: data.orderID,
            payer: details.payer,
            customId
          })
        });

        modal.style.display = 'none';
        alert('Pago confirmado. Gracias por tu compra.');
        localStorage.removeItem('carrito');
        window.location.href = '/gracias.html';
      },
      onError: (err) => {
        alert('Error procesando el pago. Por favor, intenta nuevamente.');
        console.error(err);
      }
    }).render('#paypal-button-container-modal');
  }
});

// Eventos para cerrar modal
modalClose.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Al cargar la página, calcular total
document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  calcularTotalDesdeFirestore();
});
