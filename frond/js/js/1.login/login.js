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

            await verificarprimerlogin();

            
        } else {
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


const verificarprimerlogin = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return;
        }
        const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            const { perfil, primerlogin, id } = data;
            userId = id; // Asegúrate de que `id` esté en `perfil`
            
            if (primerlogin === true) {

                document.getElementById('change-password-container').style.zIndex = '0';
                document.getElementById('change-password-container').style.opacity = '1';
            } else {
                await verificarAutenticacion();
            }
        } else {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        }
    } catch (error) {
        console.error("Error al verificar autenticación:", error);
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
    }
};



const verificarAutenticacion = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return;
        }
        const response = await fetch('http://localhost:3009/La_holandesa/verify-auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            const { perfil } = data;

            console.log(perfil);
            if (perfil === 'VENDEDOR') {
                await Swal.fire({
                    title: "Logueado correctamente!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                window.location.href = "http://127.0.0.1:5500/frond/Y.vendedor/index.html";
            } else if (perfil === 'ADMINISTRADOR') {
                await Swal.fire({
                    title: "Logueado correctamente!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/index.html";
            } else {
                window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            }
        } else {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        }
    } catch (error) {
        console.error("Error al verificar autenticación:", error);
    }
};

// Llamar a la función de verificación de autenticación al cargar la página

//**************Función para verificar la autenticación del usuario********************/

  
//*****************************editar contraseña y guardar********************************/
const formcanbiarcontra = document.getElementById("change-password-form");

formcanbiarcontra.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  const nuevaContraseña = document.getElementById("nueva_contraseña").value;
  const confirmarContraseña = document.getElementById("confirmar_contraseña").value;

  if (nuevaContraseña !== confirmarContraseña) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
      });
      return; // Detener la ejecución del código
  }

  try {
      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres guardar los cambios realizados?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
      });
      await userId
      if (isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
          return;
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
                    userId,
                    nuevaContraseña,
                }),
            }
        );
        document.getElementById('change-password-container').style.opacity = '0';

        const result = await response.json();

        if (response.status !== 200) {
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
       
        // Redirigir al usuario a la página principal adecuada
        await verificarAutenticacion();
      } else {
        document.getElementById("change-password-form").reset();
      }
  } catch (error) {
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
