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
  
  
  const getAllCliente = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return {};
        }
        const response = await fetch("http://localhost:3009/La_holandesa/cliente", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        //console.log(result);

        if (result.error) {
            console.error("Error:", result.message);
            return {};
        } else {
            return result.data.reduce((acc, category) => {
                acc[category.id_cliente] = category.nombre;
                return acc;
            }, {});
        }
    } catch (error) {
        console.error("Error:", error.message);
        return {};
    }
};

const getAllUsuario = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return {};
        }
        const response = await fetch("http://localhost:3009/La_holandesa/Users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        console.log(result);

        if (result.error) {
            console.error("Error:", result.message);
            return {};
        } else {
            return result.data.reduce((acc, measure) => {
                acc[measure.id_usuario] = measure.nombres;
                return acc;
            }, {});
        }
    } catch (error) {
        console.error("Error:", error.message);
        return {};
    }
};

const getAllClientePromise = getAllCliente();
const getAllUsuarioPromise = getAllUsuario();


  //*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
  const venta = document;
  
  const paginaVentas = venta.querySelector("#ventas");
  
  const Ventas = async (product) => {
    const {
        id_venta,
        monto_venta,
        fecha_venta,
        id_cliente,
        id_usuario,
  
    } = product;

    const formattedDate = new Date(fecha_venta).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
  
    // Esperar a que se resuelvan las promesas de getAllCategories y getAllMeasures
    const cliente = await getAllClientePromise;
    const usuario = await getAllUsuarioPromise;

    const clienteNombre = cliente[id_cliente] || "Desconocida";
    const usuarioNombre = usuario[id_usuario] || "Desconocida";


    return `
        <tr id="venta-row-${id_venta}">
            <td>${id_venta}</td>
            <td>${usuarioNombre}</td>
            <td>${clienteNombre}</td>
            <td>${monto_venta}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="btn-group">
                    <button type="button" class="btn btn btn-outline-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Imprimir
                    </button>
                </div>
            </td>
        </tr>
    `;
};

    const render = async (data) => {
      try {
          const cliente = await getAllClientePromise;
          const usuario = await getAllUsuarioPromise;
  
          if (cliente && usuario) {
              const sortedVentas = data.sort((a, b) => {
                  if (a.estado && !b.estado) {
                      return -1;
                  }
                  if (!a.estado && b.estado) {
                      return 1;
                  }
                  return a.id_venta - b.id_venta;
              });
  
              if (Array.isArray(sortedVentas) && sortedVentas.length > 0) {
                  const cardsHTML = await Promise.all(sortedVentas.map((item) => Ventas({ ...item, cliente, usuario })));
                  paginaVentas.innerHTML = cardsHTML.join("");
  
                  if (!$.fn.DataTable.isDataTable("#myTable")) {
                      $("#myTable").DataTable({
                          language: {
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
                          ],
                          pageLength: 5,
                          autoWidth: true,
                          order: [], // No ordenar ninguna columna al inicio
                          //order: [[0, 'desc']], // Ordenar la primera columna (columna del ID) de forma descendente al inicio
                      });
                  }
              } else {
                  paginaVentas.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON VENTAS.</td></tr>';
              }
          } else {
              console.error("Error: No se resolvieron correctamente las promesas de usuario y cliente.");
          }
      } catch (error) {
          console.error("Error:", error.message);
      }
  };
  
  const getAll = async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
              return;
          }
          const response = await fetch("http://localhost:3009/La_holandesa/ventas", {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error("Error en la solicitud");
          }
          const result = await response.json();
          if (result.error) {
              console.error("Error:", result.message);
              alert(result.message);
          } else {
              render(result.data);
          }
      } catch (error) {
          console.error("Error:", error.message);
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
          document.getElementById("chart").innerHTML = errorMessage.innerHTML;
      }
  };
  
 
  //*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
  

  
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
        //console.log(result.data)
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
  
      const notificationTimes = JSON.parse(localStorage.getItem('notificationTimes')) || {};
  
      productosBajoStock.forEach(producto => {
        if (!notificationTimes[producto.id_producto]) {
          notificationTimes[producto.id_producto] = new Date().toISOString();
        }
      });
  
      localStorage.setItem('notificationTimes', JSON.stringify(notificationTimes));
  
      const calculateTimeElapsed = (startTime) => {
        const currentTime = new Date();
        const startTimeDate = new Date(startTime);
        const diffTime = Math.abs(currentTime - startTimeDate);
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
  
        timeElapsed.textContent = calculateTimeElapsed(notificationTimes[producto.id_producto]);
        setInterval(() => {
          timeElapsed.textContent = calculateTimeElapsed(notificationTimes[producto.id_producto]);
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
    } else {
      localStorage.removeItem('notificationTime');
      hideNotificationBadge();
      notificationBell.classList.remove('shake');
    }
  
    notificationLink.addEventListener('click', () => {
      notificationBell.classList.remove('shake');
      hideNotificationBadge();
    });
  });

  //*************************************notificaciones**************************************/
