
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;
 
  carrito.forEach(producto => {
    total += producto.precio * (producto.cantidad || 1);
  });
 
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2) // Total a pagar
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert("Pago realizado por " + details.payer.name.given_name);
        localStorage.removeItem("carrito");
        window.location.href = "gracias.html"; // Redirige a una página de confirmación
      });
    }
  }).render("#paypal-button-container");