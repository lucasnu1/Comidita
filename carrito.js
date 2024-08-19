// Inicializa el carrito desde localStorage o como un array vacío
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualiza el contador de elementos en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

// Función para actualizar el contador de elementos en el carrito
function actualizarContadorCarrito() {
    const contadorElement = document.getElementById('contador-carrito');
    const contadorCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contadorElement) {
        contadorElement.textContent = contadorCarrito;
    }
}

// Función para mostrar una ventana emergente personalizada cuando se agrega un producto al carrito
function mostrarAlertaCarrito(mensaje) {
    // Si ya existe una alerta visible, la removemos antes de agregar una nueva
    const alertaExistente = document.querySelector('.alerta-carrito');
    if (alertaExistente) {
        alertaExistente.remove();
    }

    // Crear el contenedor de la alerta
    const alerta = document.createElement('div');
    alerta.classList.add('alerta-carrito');
    alerta.innerHTML = `
        <div class="alerta-carrito-content">
            <span>${mensaje}</span>
            <button class="close-alerta">×</button>
        </div>
    `;

    // Agregar la alerta al body
    document.body.appendChild(alerta);

    // Mostrar la alerta
    alerta.classList.add('show');

    // Ocultar la alerta después de 3 segundos o al hacer clic en el botón de cerrar
    const closeBtn = alerta.querySelector('.close-alerta');
    closeBtn.addEventListener('click', () => cerrarAlerta(alerta));
    setTimeout(() => cerrarAlerta(alerta), 3000);
}

// Función para cerrar la alerta
function cerrarAlerta(alerta) {
    alerta.classList.remove('show');
    setTimeout(() => alerta.remove(), 300); // Esperar un poco antes de remover del DOM
}

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, cantidad) {
    const itemIndex = carrito.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        carrito[itemIndex].cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, cantidad });
    }

    // Actualiza el contador del carrito
    actualizarContadorCarrito();

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Muestra la alerta de que el producto ha sido agregado
    mostrarAlertaCarrito(`${nombre} agregado al carrito.`);
}

// Evento click para los botones "Agregar"
document.querySelectorAll('.btn-outline-primary').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.card');
        if (card) {
            const id = card.getAttribute('data-id');
            const nombre = card.querySelector('.card-title').innerText;
            const cantidad = parseInt(card.querySelector('.quantity-selector').value, 10);
            if (!isNaN(cantidad) && cantidad > 0) {
                agregarAlCarrito(id, nombre, cantidad);
            }
        }
    });
});
