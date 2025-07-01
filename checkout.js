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