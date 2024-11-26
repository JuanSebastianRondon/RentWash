document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita la recarga de la página

        // Obtiene los datos del formulario
        const formData = {
            cedula: document.getElementById('cedula').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            telefono: document.getElementById('telefono').value,
            correo: document.getElementById('correo').value,
            Contraseña: document.getElementById('password').value,
        };

        // Validación del correo
        if (!validateEmail(formData.correo)) {
            alert('Por favor ingrese un correo válido.');
            return;
        }

        // Validación de la contraseña
        if (!validatePassword(formData.Contraseña)) {
            alert('La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.');
            return;
        }

        try {
            // Realiza la petición al backend
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Maneja la respuesta del backend
            if (response.ok) {
                const result = await response.json();
                alert('Registro exitoso: ' + result.message);
                form.reset(); // Reinicia el formulario
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (err) {
            alert('Error al conectar con el servidor: ' + err.message);
        }
    });

    // Función para validar el correo
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para validar la contraseña
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };
});
