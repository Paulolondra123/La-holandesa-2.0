// Función para obtener el token del servidor
const obtenerToken = async () => {
  try {
    // Hacer una solicitud HTTP al servidor para obtener el token
    const token = localStorage.getItem("token");
    if (!token) {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
      return; // Detener la ejecución del código
    }
    const respuesta = await fetch('http://localhost:3009/La_holandesa/usuario_aut', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include' // Incluir cookies en la solicitud
    });

    // Verificar si la respuesta fue exitosa (código de estado 200)
    if (respuesta.ok) {
      const datosUsuario = await respuesta.json();
      // Mostrar los datos en un formulario
      mostrarDatosEnFormulario(datosUsuario);
    } else {
      console.error('Error al obtener el token:', respuesta.statusText);
    }
  } catch (error) {
    console.error('Error al obtener el token:', error.message);
  }
};

// Función para mostrar los datos en un formulario HTML
const mostrarDatosEnFormulario = (datosUsuario) => {

    const userNavTop = document.getElementById('usernavtop');
    const userNav = document.getElementById('usernav');
    const perfi = document.getElementById('perfi');

    // Obtener los datos del usuario
    let { nombres, apellidos, perfil } = datosUsuario;

    // Convertir la primera letra de cada palabra a mayúscula y el resto a minúscula
    nombres = nombres.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    apellidos = apellidos.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    perfill = perfil.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());


    // Obtener el primer nombre y el primer apellido
    const primerNombre = nombres.split(' ')[0];
    const primerApellido = apellidos.split(' ')[0];


    // Establecer el valor del span con el nombre del usuario
    userNavTop.textContent = `${primerNombre} ${primerApellido}`;

    // Establecer el valor del h6 con el nombre del usuario
    userNav.textContent = `${primerNombre} ${primerApellido}`;

    perfi.textContent = `${perfill}`;
};
// Llamar a la función para obtener el token
obtenerToken();



//*********************************poner en mayuscula**********************************/
function mayus(e) {
  e.value = e.value.toUpperCase();
}
//*********************************poner en mayuscula**********************************/
/* const token = localStorage.getItem('token');
if (token) {
  console.log('Token JWT encontrado:', token);
} else {
  console.log('No se encontró ningún token JWT en el localStorage.');
} */
//***********************************crear categoria*************************************/
const formAgregarUsuario = document.getElementById("myForm");

formAgregarUsuario.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  // Obtener los valores del formulario
  const nombre_medida = document.getElementById("nombre_medida").value;
  const descripcion = document.getElementById("descripcion").value;

  try {
    // Verificar si el token está presente en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
      return; // Detener la ejecución del código
    }
    // Enviar los datos al servidor para crear el nuevo usuario
    const response = await fetch(
      "http://localhost:3009/La_holandesa/create_medida",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre_medida,
          descripcion,
        }),
      }
    );

    if (response.ok) {
      // Destruir DataTable antes de eliminar la fila
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $('#myTable').DataTable().destroy();
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
        title: "Se creo la medida correctamente",
      });
      getAll();
    } else {
      const errorData = await response.json();
       // Actualizar la tabla después de cambiar el estado
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        });
        Toast.fire({
            icon: "error",
            title: "Error al crear nueva categoria"
        });
      getAll();
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Error al enviar la solicitud");
  }
});
//***********************************crear categoria*************************************/

//*************renderizado de tabla categoria y mostrar tabla categoria*******************/
const medidas = document;

const paginaMedidas = medidas.querySelector("#medida");

let tablaMedidas; // Variable de control para DataTables

const Medidas = ({
  id_medida,
  nombre_medida,
  descripcion,
  fecha_registro,
  estado,
}) => {
  // Convertir la fecha de registro a un formato de año-mes-día
  const formattedDate = new Date(fecha_registro).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    /* timeZoneName: 'short' */
  });

  const buttonColor =
    estado === true ? "btn btn-outline-success" : "btn btn-outline-danger";
  const buttontxt = estado === true ? "SI" : "NO";

  return `
        <tr id="medida-row-${id_medida}"> <!-- Agregar un ID único para la fila -->
            <td>${id_medida}</td>
            <td>${nombre_medida}</td>
            <td>${descripcion}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="container-btn-state">
                    <button style="cursor: inherit;" class="${buttonColor}">${buttontxt}</button>
                </div>
            </td>
            <td>
              <div class="btn-group">
                  <button type="button" class="btn btn btn-outline-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Acciones
                  </button>
                  <ul class="dropdown-menu ">
                      <li><a id="actualizar" class="dropdown-item" onclick="toggleEditMode(${id_medida})" href="#" class="dropdown-item">Actualizar</a></li>
                      <li><a onclick="deleteUser(${id_medida})" class="dropdown-item" href="#">Eliminar</a></li>
                      <li><a onclick="changeState(${id_medida}, ${estado})" class="dropdown-item" href="#" id="change-state-${id_medida}">${estado ? "Inhabilitar" : "Habilitar"}</a></li>
                  </ul>
              </div>
            </td>
        </tr>
    `;
};

const render = (data) => {
  const sortemedida = data.sort((a, b) => {
    // Si a está habilitado y b no, a debe ir antes que b
    if (a.estado && !b.estado) {
      return -1;
    }
    // Si b está habilitado y a no, b debe ir antes que a
    if (!a.estado && b.estado) {
      return 1;
    }
    // Si ambos están habilitados o deshabilitados, ordenar por id_usuario
    return a.id_medida - b.id_medida;
  });

  if (Array.isArray(sortemedida) && sortemedida.length > 0) {
    const cardsHTML = sortemedida.map((item) => Medidas(item)).join("");
    paginaMedidas.innerHTML = cardsHTML;

  // Verificar si la tabla ya ha sido inicializada
  if (!$.fn.DataTable.isDataTable("#myTable")) {
    // Si la tabla no ha sido inicializada, inicializar DataTables
    $("#myTable").DataTable({
      language: {
        // Configuración del idioma
        decimal: "",
        emptyTable: "No hay información",
        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: ">",
          previous: "<",
        },
      },
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "Todos"],
      ], // Opciones de longitud de página
      pageLength: 5, // Mostrar 5 filas por página de manera predeterminada
      responsive: true,
      columnDefs: [
        { targets: [2], width: '400px' } // Establece el ancho de la tercera columna en 200px y máximo en 300px
      ],
      autoWidth: true,
      order: [], // No ordenar ninguna columna al inicio
      //order: [[0, 'desc']], // Ordenar la primera columna (columna del ID) de forma descendente al inicio
    });
  }

  } else {
    paginaMedidas.innerHTML =
      '<tr><td colspan="6">NO SE ENCONTRARON MEDIDAS.</td></tr>';
  }
};

const getAll = async () => {
  try {
    // Verificar si el token está presente en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
      window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
      return; // Detener la ejecución del código
    }
    const response = await fetch("http://localhost:3009/La_holandesa/medida",{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
  })
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const result = await response.json();
    /* console.log(result); */
    if (result.error) {
      console.error("Error:", result.message);
      alert(result.message);
    } else {
      render(result.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Crear un elemento HTML para mostrar el mensaje de error
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = `
        <div class="row vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
          <div class="col-md-6 text-center p-4">
            <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
            <h1 class="display-1 fw-bold">Error 404</h1>
            <h1 class="mb-4">Page Not Found</h1>
            <p class="mb-4">${error.message}</p>
            <a class="btn btn-primary rounded-pill py-3 px-5" href="">Go Back To Home</a>
          </div>
        </div>
    `;
    // Agregar el mensaje de error al body del documento
    document.getElementById("chart").innerHTML = errorMessage.innerHTML;
  }
};

//*************renderizado de tabla categoria y mostrar tabla categoria*******************/
let isEditMode = false;

const toggleEditMode = (id_medida) => {
  const row = document.getElementById(`medida-row-${id_medida}`);
  const editButton = row.querySelector("#actualizar");
  const cells = row.getElementsByTagName("td");

  // Guardar los valores originales de todas las celdas
  const valoresOriginales = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    valoresOriginales.push(cell.innerHTML);
  }

  if (!isEditMode) {
    // Modo de edición
    editMedida(id_medida);
    editButton.innerHTML = "Guardar";
    editButton.setAttribute(
      "onclick",
      `toggleEditMode(${id_medida}, ${JSON.stringify(valoresOriginales)})`
    );
    isEditMode = true;
  } else {
    // Modo de guardar cambios
    saveChanges(id_medida, valoresOriginales);
    editButton.innerHTML = "Actualizar";
    editButton.setAttribute("onclick", `toggleEditMode(${id_medida})`);
    isEditMode = false;
  }
};
//*****************************editar categoria y guardar********************************/
const editMedida = (id_medida) => {
  const row = document.getElementById(`medida-row-${id_medida}`);
  const cells = row.getElementsByTagName("td");

  // Guardar los valores originales de todas las celdas
  const valoresOriginales = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    valoresOriginales.push(cell.innerHTML);
  }

  // Iterar sobre las celdas de la fila, excepto la primera y las últimas tres
  for (let i = 1; i < cells.length - 3; i++) {
    const cell = cells[i];
    const oldValue = cell.innerText.trim();
    cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" style="width: 100%; ">`;
  }

  // Dejar la primera celda (id_medida) y las últimas tres celdas sin modificar
  for (let i = 0; i < 1; i++) {
    const cell = cells[i];
    // Aquí puedes dejar el contenido de la celda como está
  }
  for (let i = cells.length - 3; i < cells.length; i++) {
    const cell = cells[i];
    // Aquí puedes dejar el contenido de la celda como está
  }

  const editButton = cells[cells.length - 1].querySelector("#actualizar");
  editButton.setAttribute(
    "onclick",
    `toggleEditMode(${id_medida}, ${JSON.stringify(valoresOriginales)}, this)`
  );
};

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_medida, valoresOriginales) => {
  const row = document.getElementById(`medida-row-${id_medida}`);
  const cells = row.getElementsByTagName("td");

  const newValues = [];
  for (let i = 1; i < cells.length - 3; i++) {
    const cell = cells[i];
    const newValue = cell.getElementsByTagName("input")[0].value;
    newValues.push(newValue);
  }

  // Restaurar los valores de la primera celda (id_medida) y las últimas tres celdas
  for (let i = 0; i < 1; i++) {
    const cell = cells[i];
    cell.innerHTML = valoresOriginales[i];
  }
  for (let i = cells.length - 3; i < cells.length; i++) {
    const cell = cells[i];
    cell.innerHTML = valoresOriginales[i];
  }

  try {
    // Mostrar el SweetAlert2 antes de guardar los cambios
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar los cambios realizados?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
    });

    if (isConfirmed) {
      // Verificar si el token está presente en el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        return; // Detener la ejecución del código
      }
      const response = await fetch(
        `http://localhost:3009/La_holandesa/medida/${id_medida}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre_medida: newValues[0],
            descripcion: newValues[1],
          }),
        }
      );

      if (response.status !== 200) {
        // Actualizar la tabla después de cambiar el estado
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: "Error al actualizar la medida",
        });
      }
      // Destruir DataTable antes de eliminar la fila
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $('#myTable').DataTable().destroy();
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
        title: "Se actualizo correctamente",
      });
      getAll();
    } else {
      // Si el usuario cancela, ejecutar la función getAll()
      getAll();
    }
  } catch (error) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "error",
      title: "Ocurrio un error al actualizar la medida",
    });
    // Eliminar la clase 'active' del botón
    editButton.classList.remove("active");
    getAll();
  }
};
//*****************************editar categoria y guardar********************************/

//*******************************inavilitar, eliminar*********************************/
// CAmbiar state de la medida (deshabilitacion logica)
const changeState = async (userId, currentState) => {
  try {
    let newState = true;
    let buttonText = "Habilitar";
    if (currentState == true) {
      newState = false;
      buttonText = "Inhabilitar";
    }
    // Mostrar el SweetAlert2 antes de cambiar el estado
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas ${buttonText.toLowerCase()} la medida ${userId}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${buttonText.toLowerCase()}`,
      background: "rgba(255, 255, 255,)",
    });

    if (isConfirmed) {
      // Verificar si el token está presente en el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        return; // Detener la ejecución del código
      }
      const response = await fetch(
        `http://localhost:3009/La_holandesa/medida/${userId}/state`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ state: newState }), // Cambiar el estado a 0
        }
      );

      if (response.ok) {
        const messageData = await response.json();
        // Destruir DataTable antes de eliminar la fila
        if ($.fn.DataTable.isDataTable("#myTable")) {
          $('#myTable').DataTable().destroy();
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
          title: messageData.message,
        });
        getAll();
      } else {
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
          title: "Error al cambiar el estado de la medida",
        });
        getAll();
      }
    }
  } catch (error) {
    alert("Error " + error);
    getAll();
  }
};
//*******************************inavilitar, eliminar*********************************/

//*************************************eliminar**************************************/
const deleteUser = async (userId) => {
  try {
    // Mostrar el SweetAlert2 antes de eliminar el usuario
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar la medida ${userId}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      background: "rgba(255, 255, 255,)",
    });

    if (isConfirmed) {
      // Verificar si el token está presente en el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        return; // Detener la ejecución del código
      }
      const response = await fetch(
        `http://localhost:3009/La_holandesa/medida_delete/${userId}`,
        {
          method: "DELETE",
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.ok) {
        const eliminado = await response.json();
        // Destruir DataTable antes de eliminar la fila
        if ($.fn.DataTable.isDataTable("#myTable")) {
          $('#myTable').DataTable().destroy();
        }
        // Actualizar la tabla después de eliminar el usuario
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: eliminado.message,
        });

        getAll(); // Función para actualizar la tabla
      } else {
        // Actualizar la tabla después de un error
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Error al eliminar medida",
        });

        getAll(); // Función para actualizar la tabla
      }
    }
  } catch (error) {
    alert("Error " + error);
    getAll(); // Función para actualizar la tabla
  }
};
//*************************************eliminar**************************************/

getAll();













  //*************************************notificaciones**************************************/
  
  const getAllProducto = async () => {
    try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
        }
        const response = await fetch("http://localhost:3009/La_holandesa/productos_stock", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        console.log(result.data)
        if (result.error) {
            console.error("Error:", result.message);
            return [];
        } else {
            return result.data;
        }
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
};
  
document.addEventListener('DOMContentLoaded', async (event) => {
  const notificationBadge = document.getElementById('notification-badge');
  const notificationLink = document.getElementById('notification-link');
  const notificationBell = document.getElementById('notification-bell');
  const notificationContent = document.getElementById('notification-content');

  function showNotificationBadge() {
    notificationBadge.style.display = 'block';
  }

  function hideNotificationBadge() {
    notificationBadge.style.display = 'none';
  }

  const productos = await getAllProducto();
  const productosBajoStock = productos.filter(producto => producto.stock < 5);

  if (productosBajoStock.length > 0) {
    showNotificationBadge();
    notificationBell.classList.add('shake');
    notificationContent.innerHTML = ''; // Limpiar el contenido de notificaciones

    if (!localStorage.getItem('notificationTime')) {
      localStorage.setItem('notificationTime', new Date().toISOString());
    }

    const notificationTime = new Date(localStorage.getItem('notificationTime'));

    const calculateTimeElapsed = () => {
      const currentTime = new Date();
      const diffTime = Math.abs(currentTime - notificationTime);
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        return `Hace ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
      } else if (diffHours > 0) {
        return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
      } else {
        return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
      }
    };

    productosBajoStock.forEach(producto => {
      const notificationItem = document.createElement('a');
      notificationItem.href = "productos.html";
      notificationItem.className = "dropdown-item";
      const timeElapsed = document.createElement('small');

      timeElapsed.textContent = calculateTimeElapsed();
      setInterval(() => {
        timeElapsed.textContent = calculateTimeElapsed();
      }, 60000); // Actualizar cada minuto

      notificationItem.innerHTML = `
        <h6 class="fw-normal mb-0">${producto.nombre_producto}: <br> ${producto.stock} en stock</h6>
      `;
      notificationItem.appendChild(timeElapsed);
      notificationContent.appendChild(notificationItem);

      const divider = document.createElement('hr');
      divider.className = "dropdown-divider";
      notificationContent.appendChild(divider);
    });

    /* const seeAllItem = document.createElement('a');
    seeAllItem.href = "#";
    seeAllItem.className = "dropdown-item text-center";
    seeAllItem.textContent = "See all notifications";
    notificationContent.appendChild(seeAllItem); */
  }

  notificationLink.addEventListener('click', () => {
    notificationBell.classList.remove('shake');
    hideNotificationBadge();
  });
});

  //*************************************notificaciones**************************************/
