document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");

    // Lista de productos
    const productos = [
        { id: 1, marca: "LG", modelo: "7kg", estado: "Disponible", ubicacion: "Calle 123", imagen: "img/lg1.jpg" },
        { id: 2, marca: "Samsung", modelo: "9kg", estado: "Disponible", ubicacion: "Avenida 456", imagen: "img/samsung1.jpg" },
        { id: 3, marca: "Whirlpool", modelo: "8kg", estado: "Disponible", ubicacion: "Calle 789", imagen: "img/whirlpool1.jpg" },
        { id: 4, marca: "Electrolux", modelo: "10kg", estado: "Disponible", ubicacion: "Zona Norte", imagen: "img/electrolux1.jpg" },
    ];

    // Renderizar productos
    productos.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.marca}" class="product-image">
            <h3>${product.marca} ${product.modelo}</h3>
            <p>Estado: ${product.estado}</p>
            <p>Ubicación: ${product.ubicacion}</p>
            <button class="btn alquilar" data-id="${product.id}">Alquilar</button>
        `;
        productList.appendChild(card);
    });

    // Evento para alquilar
    document.querySelectorAll(".alquilar").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.dataset.id;
            alert(`Has alquilado la lavadora ID: ${productId}`);
        });
    });
});
