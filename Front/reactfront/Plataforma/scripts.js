// Variables globales
const cart = [];
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const loginLink = document.getElementById('loginLink');
let userLoggedIn = false; // Estado de inicio de sesión (simulado)

// Simula inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    // Verifica si el usuario está logueado (esto debería venir del backend)
    userLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';

    // Actualiza el enlace de inicio/cierre de sesión
    loginLink.textContent = userLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión';
    loginLink.href = userLoggedIn ? 'logout.html' : 'login.html';
});

// Función para agregar lavadoras al carrito
function addToCart(name, model) {
    if (!userLoggedIn) {
        alert('Debes iniciar sesión para agregar lavadoras al carrito.');
        return;
    }

    // Solicitar las horas de alquiler al usuario
    const hours = prompt(`¿Cuántas horas deseas alquilar la ${name}?`);
    if (hours && !isNaN(hours) && hours > 0) {
        cart.push({ name, model, hours: parseInt(hours, 10) });
        updateCart(); // Actualiza la vista del carrito
    } else {
        alert('Por favor, ingresa un número válido de horas.');
    }
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    cartCount.textContent = cart.length; // Actualiza el contador
    cartItems.innerHTML = ''; // Limpia la lista actual

    // Agrega cada elemento del carrito a la lista
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (${item.model}) - Horas: ${item.hours}`;

        // Botón para eliminar el ítem del carrito
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => removeFromCart(index);

        li.appendChild(deleteButton);
        cartItems.appendChild(li);
    });
}

// Función para eliminar un ítem del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el ítem del carrito
    updateCart(); // Actualiza la vista del carrito
}

// Función para proceder a la página de pago
function goToPaymentPage() {
    if (cart.length === 0) {
        alert('Por favor, selecciona al menos una lavadora antes de continuar.');
        return;
    }

    // Guarda el carrito en sessionStorage para usarlo en la página de pago
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'pago.html'; // Redirige a la página de pago
}


