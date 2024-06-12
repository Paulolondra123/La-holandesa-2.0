let userId = null; // Variable global para almacenar el ID del usuario
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
            userId = data.id; 
            const { perfil } = data; // Suponiendo que el perfil está incluido en los datos de la respuesta
            //console.log(perfil)
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

  
//*****************************editar contraseña y guardar********************************/
const formcanbiarcontra = document.getElementById("change-password-form");

formcanbiarcontra.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  const nuevaContraseña = document.getElementById("nueva_contraseña").value;
  const confirmarContraseña = document.getElementById("confirmar_contraseña").value;


  // Verificar si las contraseñas nuevas coinciden
  if (nuevaContraseña !== confirmarContraseña) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
      });
      return; // Detener la ejecución del código
  }

  try {
      // Mostrar el SweetAlert2 antes de guardar los cambios
      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres guardar los cambios realizados?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
      });

      if (isConfirmed) {
        // Hacer una solicitud HTTP al servidor para obtener el token
        const token = localStorage.getItem("token");
        if (!token) {
          // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return; // Detener la ejecución del código
        }
        const response = await fetch(
            'http://localhost:3009/La_holandesa/cambiar_contrasena',
            {
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId, //`${userId}`, // Incluir el ID del usuario en el cuerpo de la solicitud 
                    contraseñaActual,
                    nuevaContraseña,
                }),
            }
        );

        const result = await response.json();

        if (response.status !== 200) {
            // Actualizar la tabla después de cambiar el estado
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "error",
              title: result.error || 'Error al actualizar la contraseña',
            });
            return;
        }
        // Actualizar la tabla después de cambiar el estado
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: 'Contraseña actualizada correctamente',
        });
        document.getElementById("change-password-form").reset();

      } else {
        // Si el usuario cancela y limpia el formulario
        document.getElementById("change-password-form").reset();
      }
  } catch (error) {
      /* Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la contraseña',
      }); */
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: 'Ocurrió un error al actualizar la contraseña',
      });
  }
});

  

//*****************************editar contraseña y guardar********************************/

  