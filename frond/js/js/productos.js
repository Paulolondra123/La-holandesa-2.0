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
  
  const getAllCategories = async () => {
    try {
      // Verificar si el token está presente en el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        return; // Detener la ejecución del código
      }
      const response = await fetch("http://localhost:3009/La_holandesa/categoria",{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const result = await response.json();
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
  
  const getAllMeasures = async () => {
    try {
      // Verificar si el token está presente en el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
        window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
        return; // Detener la ejecución del código
      }
      const response = await fetch("http://localhost:3009/La_holandesa/medida",{
        headers:{
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
  
  const populateSelect = (selectElement, options, valueFieldName, textFieldName) => {
    selectElement.innerHTML = '<option value="">Seleccione una opción</option>';
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option[valueFieldName];
        optionElement.textContent = option[textFieldName];
        selectElement.appendChild(optionElement);
    });
  };

  const populateFormSelects = async () => {
      const categoriaSelect = document.getElementById("categoria");
      const medidaSelect = document.getElementById("medida");

      const categorias = await getAllCategories();
      const medidas = await getAllMeasures();

      populateSelect(categoriaSelect, categorias, "id_categoria", "nombre_categoria");
      populateSelect(medidaSelect, medidas, "id_medida", "nombre_medida");

      // Inicializa Select2 en los selectores después de haber poblado las opciones
      $(document).ready(function() {
          $('#categoria').select2();
          $('#medida').select2();
      });
  };

  // Llama a esta función para poblar los select cuando la página se carga
  populateFormSelects();
  //***********************************crear usuario*************************************/
  const formAgregarUsuario = document.getElementById("form");
  
  formAgregarUsuario.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitars que se recargue la página al enviar el formulario

    // Obtener los valores del formulario, incluida la foto
    const nombre_producto = document.getElementById("nombre_producto").value;
    const precio = document.getElementById("precio").value;
    const fecha_elaboracion = document.getElementById("fecha_elaboracion").value;
    const fecha_vencimiento = document.getElementById("fecha_vencimiento").value;
    const categoria = document.getElementById("categoria").value;
    const medida = document.getElementById("medida").value;

    console.log(nombre_producto, precio,fecha_elaboracion, fecha_vencimiento, categoria, medida)

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
        "http://localhost:3009/La_holandesa/create_Productos",
        {
          method: "POST",
          headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
          },
          //body: formData, // Usar el FormData que contiene la foto
          body: JSON.stringify({
            nombre_producto,
            precio,
            fecha_elaboracion,
            fecha_vencimiento,
            categoria,
            medida
            
           })
        }
      );
  
      if (response.ok) {
        const create = await response.json();
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
          title: create.message,
        });
        
        getAll();
      } else {
        const errorData = await response.json();
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "error",
          title: errorData.error,
        });
        getAll();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al enviar la solicitud");
    }
  });
  //***********************************crear usuario*************************************/





  const getAllCategorie = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return {};
        }
        const response = await fetch("http://localhost:3009/La_holandesa/categoria", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        if (result.error) {
            console.error("Error:", result.message);
            return {};
        } else {
            return result.data.reduce((acc, category) => {
                acc[category.id_categoria] = category.nombre_categoria;
                return acc;
            }, {});
        }
    } catch (error) {
        console.error("Error:", error.message);
        return {};
    }
};

const getAllMeasure = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return {};
        }
        const response = await fetch("http://localhost:3009/La_holandesa/medida", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        if (result.error) {
            console.error("Error:", result.message);
            return {};
        } else {
            return result.data.reduce((acc, measure) => {
                acc[measure.id_medida] = measure.nombre_medida;
                return acc;
            }, {});
        }
    } catch (error) {
        console.error("Error:", error.message);
        return {};
    }
};

const getAllCategoriesPromise = getAllCategorie();
const getAllMeasuresPromise = getAllMeasure();


  //*************renderizado de tabla usuarios y mostrar tabla usuario*******************/
  const producto = document;
  
  const paginaProductos = producto.querySelector("#productos");
  
  const Productos = async (product) => {
    const {
        id_producto,
        nombre_producto,
        precio,
        fecha_elaboracion,
        fecha_vencimiento,
        stock,
        id_categoria,
        id_medida,
        fecha_registro,
        estado
    } = product;

    const formattedDate = new Date(fecha_registro).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const format_ela = new Date(fecha_elaboracion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const format_venc = new Date(fecha_vencimiento).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const buttonColor = estado === true ? "btn btn-outline-success" : "btn btn-outline-danger";
    const buttontxt = estado === true ? "SI" : "NO";
  
    // Mostrar la contraseña como asteriscos
    /* const maskedPassword = contraseña.replace(/./g, '*'); */
    // Mostrar solo los últimos 4 caracteres de la contraseña cifrada
    /* const maskedPassword = `******${contraseña.slice(-4)}`; */
    // Mostrar la contraseña cifrada como asteriscos
    /* const maskedPassword = '*'.repeat(contraseña.length); */
    // Mostrar los primeros 2 y últimos 2 caracteres de la contraseña cifrada
    /* const maskedPassword = `${contraseña.slice(0, 2)}..${contraseña.slice(-2)}`; */

    // Esperar a que se resuelvan las promesas de getAllCategories y getAllMeasures
    const categorias = await getAllCategoriesPromise;
    const medidas = await getAllMeasuresPromise;

    const categoriaNombre = categorias[id_categoria] || "Desconocida";
    const medidaNombre = medidas[id_medida] || "Desconocida";
    //console.log("Nombre de la categoría:", categoriaNombre);
    //console.log("Nombre de la medida:", medidaNombre);

    return `
        <tr id="producto-row-${id_producto}">
            <td>${id_producto}</td>
            <td>${nombre_producto}</td>
            <td>${precio}</td>
            <td>${format_ela}</td>
            <td>${format_venc}</td>
            <td>${stock}</td>
            <td>${categoriaNombre}</td>
            <td>${medidaNombre}</td>
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
                        <li><a id="actualizar" class="dropdown-item" onclick="toggleEditMode(${id_producto})" class="dropdown-item" href="#">Actualizar</a></li>
                        <li><a onclick="deleteUser(${id_producto})" class="dropdown-item" href="#">Eliminar</a></li>
                        <li><a onclick="changeState(${id_producto}, ${estado})" class="dropdown-item" href="#" id="change-state-${id_producto}">${estado ? "Inhabilitar" : "Habilitar"}</a></li>
                    </ul>
                </div>
            </td>
        </tr>
    `;
};
  /* const render = (data) => {
      const filteredProductos = data.filter(user => user.estado == true);
      const sortedProductos = filteredProductos.sort((a, b) => a.id_producto - b.id_producto);
    
      if (Array.isArray(sortedProductos) && sortedProductos.length > 0) {
        const cardsHTML = sortedProductos.map(item => Productos(item)).join('');
        paginaProductos.innerHTML = cardsHTML;
      } else {
        paginaProductos.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON USUARIOS.</td></tr>';
      }
    }; */
   /*  const render =  async (data) => {
      const sorteproducto = data.sort((a, b) => {
        // Si a está habilitado y b no, a debe ir antes que b
        if (a.estado && !b.estado) {
          return -1;
        }
        // Si b está habilitado y a no, b debe ir antes que a
        if (!a.estado && b.estado) {
          return 1;
        }
        // Si ambos están habilitados o deshabilitados, ordenar por id_usuario
        return a.id_producto - b.id_producto;
      });
    
      if (Array.isArray(sorteproducto) && sorteproducto.length > 0) {
        const cardsHTML = sorteproducto.map((item) => Productos(item)).join("");
        paginaProductos.innerHTML = cardsHTML;
    
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
          rowCallback: function(row, data) {
            if (data[5] < 10) {
                $('td:eq(5)', row).css('color', 'red'); // Cambia el color de las celdas en la cuarta columna si el valor es menor a 20
            }
          },
          responsive: true,
        });
      }
    
      } else {
        paginaProductos.innerHTML =
          '<tr><td colspan="8">NO SE ENCONTRARON PRODUCTOS.</td></tr>';
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
        const response = await fetch("http://localhost:3009/La_holandesa/productos",{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
      })
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        //console.log(result); 
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
    };  */
    
    const render = async (data) => {
      try {
          const categorias = await getAllCategoriesPromise;
          const medidas = await getAllMeasuresPromise;
  
          if (categorias && medidas) {
              const sortedProductos = data.sort((a, b) => {
                  if (a.estado && !b.estado) {
                      return -1;
                  }
                  if (!a.estado && b.estado) {
                      return 1;
                  }
                  return a.id_producto - b.id_producto;
              });
  
              if (Array.isArray(sortedProductos) && sortedProductos.length > 0) {
                  const cardsHTML = await Promise.all(sortedProductos.map((item) => Productos({ ...item, categorias, medidas })));
                  paginaProductos.innerHTML = cardsHTML.join("");
  
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
                          rowCallback: function (row, data) {
                              if (data[5] < 5) {
                                  $('td:eq(5)', row).css('color', 'red');
                              }
                          },
                          autoWidth: true,
                          order: [], // No ordenar ninguna columna al inicio
                          //order: [[0, 'desc']], // Ordenar la primera columna (columna del ID) de forma descendente al inicio
                      });
                  }
              } else {
                  paginaProductos.innerHTML = '<tr><td colspan="8">NO SE ENCONTRARON PRODUCTOS.</td></tr>';
              }
          } else {
              console.error("Error: No se resolvieron correctamente las promesas de categorías y medidas.");
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
          const response = await fetch("http://localhost:3009/La_holandesa/productos", {
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
  



  let isEditMode = false;
  
  const toggleEditMode = (id_producto) => {
    const row = document.getElementById(`producto-row-${id_producto}`);
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
      editproducto(id_producto);
      editButton.innerHTML = "Guardar";
      editButton.setAttribute(
        "onclick",
        `toggleEditMode(${id_producto}, ${JSON.stringify(valoresOriginales)})`
      );
      isEditMode = true;
    } else {
      // Modo de guardar cambios
      saveChanges(id_producto, valoresOriginales);
      editButton.innerHTML = "Actualizar";
      editButton.setAttribute("onclick", `toggleEditMode(${id_producto})`);
      isEditMode = false;
    }
  };
  
  //*****************************editar usuario y guardar********************************/
  const editproducto = (id_producto) => {
    const row = document.getElementById(`producto-row-${id_producto}`);
    const cells = row.getElementsByTagName("td");
  
    // Guardar los valores originales de todas las celdas
    const valoresOriginales = [];
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      valoresOriginales.push(cell.innerHTML);
    }
  
    // Iterar sobre las celdas de la fila, excepto la primera y las últimas tres
    for (let i = 1; i < cells.length - 6; i++) {
      const cell = cells[i];
      const oldValue = cell.innerText.trim();
      cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" style="width: 100%; ">`;
    }
  
    // Dejar la primera celda (id_producto) y las últimas tres celdas sin modificar
    for (let i = 0; i < 1; i++) {
      const cell = cells[i];
      // Aquí puedes dejar el contenido de la celda como está
    }
    for (let i = cells.length - 6; i < cells.length; i++) {
      const cell = cells[i];
      // Aquí puedes dejar el contenido de la celda como está
    }
  
    const editButton = cells[cells.length - 1].querySelector("#actualizar");
    editButton.setAttribute(
      "onclick",
      `toggleEditMode(${id_producto}, ${JSON.stringify(valoresOriginales)}, this)`
    );
  };
  
  // Función para guardar los cambios realizados en la fila
  const saveChanges = async (id_producto, valoresOriginales) => {
    const row = document.getElementById(`producto-row-${id_producto}`);
    const cells = row.getElementsByTagName("td");
    const newValues = [];
  
    for (let i = 1; i < cells.length - 6; i++) {
      const cell = cells[i];
      const newValue = cell.getElementsByTagName("input")[0].value;
      newValues.push(newValue);
    }
  
    // Restaurar los valores de la primera celda (id_producto) y las últimas tres celdas
    for (let i = 0; i < 1; i++) {
      const cell = cells[i];
      cell.innerHTML = valoresOriginales[i];
    }
    for (let i = cells.length - 6; i < cells.length; i++) {
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
          `http://localhost:3009/La_holandesa/Productos/${id_producto}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              nombre_producto: newValues[0],
              precio: newValues[1],
              fecha_elaboracion: newValues[2],
              fecha_vencimiento: newValues[3],
              categoria: newValues[4],
              medida: newValues[5],
              stock: newValues[6]
            }),
          }
        );
  
        if (response.ok) {
          const update = await response.json();
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
            title: update.message,
          });
          getAll();
        } else {
          const updat = await response.json();
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
            title: "Error al actualizar el usuario",
          });
          getAll();
        }
      } else {
        // Si el usuario cancela, ejecutar la función getAll()
        getAll();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      // Eliminar la clase 'active' del botón
      getAll();
    }
  };
  //*****************************editar usuario y guardar********************************/
  
  //*******************************inavilitar, habilitar*********************************/
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
        text: `¿Deseas ${buttonText.toLowerCase()} el producto ${userId}?`,
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
          `http://localhost:3009/La_holandesa/Productos/${userId}/state`,
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
            title: "Error al cambiar el estado del producto",
          });
          getAll();
        }
      }
    } catch (error) {
      alert("Error " + error);
      getAll();
    }
  };
  
  //*******************************inavilitar, habilitar*********************************/
  
  //*************************************eliminar**************************************/
  const deleteUser = async (userId) => {
    try {
      // Mostrar el SweetAlert2 antes de eliminar el usuario
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar el producto ${userId}?`,
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
          `http://localhost:3009/La_holandesa/Productos_delete/${userId}`,
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
            title: "Error al eliminar producto",
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
