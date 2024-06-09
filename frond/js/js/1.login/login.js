
// login.js
const form_login = document.getElementById('login-form');
form_login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3009/La_holandesa/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username, 
                password 
            }),
            credentials: 'include' // Incluye las cookies en la solicitud   
        });
        
        const data = await response.json(); // Parsear la respuesta JSON

        if (response.ok) {
            localStorage.setItem('token', data.token);
            await Swal.fire({
                title: "Logueado correctamente!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            verificarAutenticacion(); // Verificar la autenticación después de iniciar sesión
        } else {
            // Manejo de errores en caso de credenciales incorrectas
            Swal.fire({
                title: "Error",
                text: data.error || 'Credenciales incorrectas',
                icon: "error",
                timer: 3000
            });
        }

    } catch (err) {
        console.error('Error al enviar la solicitud:', err);
        Swal.fire({
            title: "Error",
            text: 'Error al enviar la solicitud',
            icon: "error",
            timer: 3000
        });
    }
});


const verificarAutenticacion = async () => {
    try {
        const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const { perfil } = data; // Suponiendo que el perfil está incluido en los datos de la respuesta
            console.log(perfil)
            // Redirigir según el perfil del usuario
            if (perfil === 'VENDEDOR') {
                // Redirigir a la página del vendedor
                window.location.href = "http://127.0.0.1:5500/frond/Y.vendedor/index.html";
            } else if (perfil === 'ADMINISTRADOR') {
                // Redirigir a la página del administrador
                window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/index.html";
            } else {
                // Perfil desconocido, redirigir a la página de inicio de sesión
                window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            }
        } else {
            // El usuario no está autenticado, redirigirlo a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        }
    } catch (error) {
        console.error("Error al verificar autenticación:", error);
    }
};

// Llamar a la función de verificación de autenticación al cargar la página


// Función para decodificar un token JWT (JSON Web Token)
function parseJwt(token) {
    try {
        // Dividir el token en sus tres partes: encabezado, carga útil y firma
        const [header, payload, signature] = token.split('.');
        // Decodificar la carga útil Base64 y analizarla como JSON
        const decodedPayload = JSON.parse(atob(payload));
        // Decodificar el encabezado Base64 y analizarlo como JSON
        const decodedHeader = JSON.parse(atob(header));
        return { header: decodedHeader, payload: decodedPayload };
    } catch (error) {
        // Manejar errores al decodificar el token
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

//**************Función para verificar la autenticación del usuario********************/

  
  //**************Función para verificar la autenticación del usuario********************/
  