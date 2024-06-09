// Agrega un evento de clic al botón de cerrar sesión
const logoutButton = document.getElementById('logout-session');
logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("hisiste click")
    try {
        // Envía una solicitud al servidor para cerrar la sesión
        const response = await fetch('http://localhost:3009/La_holandesa/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token en el encabezado de autorización
            }
        });

        if (response.ok) {
            // Elimina el token del almacenamiento local
            localStorage.removeItem('token');
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = 'http://127.0.0.1:5500/frond/Z.administrador/login.html';
        } else {
            const errorData = await response.json();
            console.error('Error al cerrar sesión:', errorData.error);
            alert('Error al cerrar sesión');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de cierre de sesión:', error);
        alert('Error al enviar la solicitud de cierre de sesión');
    }
});