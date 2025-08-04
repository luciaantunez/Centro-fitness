document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  paypalUSD.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        const pedido = {
          cliente: details.payer.name.given_name + " " + details.payer.name.surname,
          email: details.payer.email_address,
          productos: carrito,
          total: total,
          fecha: new Date().toISOString()
        };

        // Esta función ya debería estar disponible en window
        guardarPedidoEnFirebase(pedido);

        alert("Pago realizado por " + details.payer.name.given_name);
        localStorage.removeItem("carrito");
        window.location.href = "gracias.html";
      });
    }
  }).render("#paypal-button-container");



paypalUYU.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2),
          currency_code: "UYU"
        }
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then((details) => {
      const pedido = {
        cliente: details.payer.name.given_name + " " + details.payer.name.surname,
        email: details.payer.email_address,
        productos: carrito,
        total: total,
        moneda: "UYU",
        fecha: new Date().toISOString()
      };
      guardarPedidoEnFirebase(pedido);
      alert("Pago en UYU realizado por " + details.payer.name.given_name);
      localStorage.removeItem("carrito");
      window.location.href = "gracias.html";
    });
  }
}).render('#paypal-uyu-button');

});


function showCurrency(currency) {
        const usdBtn = document.getElementById("btn-usd");
        const uyuBtn = document.getElementById("btn-uyu");

        const usdDiv = document.querySelector(".paypal-tab.usd");
        const uyuDiv = document.querySelector(".paypal-tab.uyu");

        if (currency === "usd") {
            usdBtn.classList.add("active");
            uyuBtn.classList.remove("active");
            usdDiv.style.display = "block";
            uyuDiv.style.display = "none";
        } else {
            usdBtn.classList.remove("active");
            uyuBtn.classList.add("active");
            usdDiv.style.display = "none";
            uyuDiv.style.display = "block";
        }
    }


    // Importamos funciones necesarias de Firebase para lectura de datos
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// Importamos la configuración inicial de Firebase (tu archivo firebase.js)
import { app } from "./firebase.js";

// Obtenemos la referencia a la base de datos Firebase
const db = getDatabase(app);
const dbRef = ref(db);

// Leemos el carrito desde localStorage y parseamos el JSON, o usamos array vacío si no existe
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Variable para acumular el total en dólares
let totalUSD = 0;

// Función para calcular el total de la compra trayendo los precios desde Firebase
function calcularTotalDesdeFirebase() {
  // Obtenemos los datos bajo la ruta 'productos' de Firebase
  get(child(dbRef, 'productos'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        // Si no hay productos en Firebase, mostramos un error en consola
        console.error("No se encontraron productos en Firebase");
        return;
      }

      // Convertimos el snapshot a un array con todos los productos
      const productos = Object.values(snapshot.val());

      // Reiniciamos el total a 0 antes de sumar
      totalUSD = 0;

      // Para cada producto en el carrito local
      carrito.forEach(item => {
        // Buscamos en el array de productos el que tenga el mismo nombre exacto
        const producto = productos.find(p => p.nombre === item.nombre);

        if (!producto) {
          // Si no encontramos el producto en Firebase, avisamos con un warning y saltamos
          console.warn(`Producto no encontrado en Firebase: ${item.nombre}`);
          return;
        }

        // Si encontramos el producto, multiplicamos su precio por la cantidad pedida
        /* const cantidad = item.cantidad || 1;
        totalUSD += producto.precio * cantidad; */
      });

      // Finalmente mostramos el total calculado en pantalla
      mostrarTotalUSD();
    })
    .catch(error => {
      // En caso de error al leer Firebase, lo mostramos en consola
      console.error("Error al traer productos desde Firebase:", error);
    });
}

// Función que muestra el total en el elemento con id 'total-monto' en el HTML
function mostrarTotalUSD() {
  const totalSpan = document.getElementById("total-monto");
  if (totalSpan) {
    totalSpan.textContent = `$${totalUSD.toFixed(2)} USD`;
  }
}

// Ejecutamos el cálculo y muestra del total apenas carga la página
document.addEventListener("DOMContentLoaded", () => {
  calcularTotalDesdeFirebase();
});