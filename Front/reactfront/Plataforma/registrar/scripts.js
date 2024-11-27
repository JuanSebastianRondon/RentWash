document.addEventListener('DOMContentLoaded', () => {
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password');

    togglePasswordButton.addEventListener('click', () => {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePasswordButton.textContent = 'Ocultar';
        } else {
            passwordField.type = 'password';
            togglePasswordButton.textContent = 'Mostrar';
        }
    });
});
