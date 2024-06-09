//**************Función para verificar la autenticación del usuario********************/
/* const verificarAutenticacion = async () => {
  try {
    const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.ok) {
      // El usuario está autenticado, mostrar contenido relevante
      //const data = await response.json();
      console.log("Usuario autenticado:");
      window.location.href = "http://127.0.0.1:5500/frond/usuarios.html";
      // Aquí puedes mostrar el contenido relevante en la página
    } else {
      // El usuario no está autenticado, redirigirlo a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/login.html";
    }
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
  }
};

// Llamar a la función de verificación de autenticación al cargar la página
window.onload = verificarAutenticacion; */

//**************Función para verificar la autenticación del usuario********************/
/* const verificarAutenticacion = async () => {
  try {
    const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.ok) {
      // El usuario está autenticado, mostrar contenido relevante
      //const data = await response.json();
      console.log("Usuario autenticado:");
      window.location.href = "http://127.0.0.1:5500/frond/usuarios.html";

      // Aquí puedes mostrar el contenido relevante en la página
    } else {
      // El usuario no está autenticado, redirigirlo a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/login.html";
    }
  } catch (error) {
    console.error("Error al verificar autenticación:", error);
  }
};

// Llamar a la función de verificación de autenticación al cargar la página
window.onload = verificarAutenticacion; */