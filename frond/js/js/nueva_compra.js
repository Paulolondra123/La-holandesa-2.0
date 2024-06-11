let idcliente = ''
let idproducto = ''
let datosUsuario = null; // Declarar la variable en el ámbito global

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
            datosUsuario = await respuesta.json();
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



//***********************************crear proveedor*************************************/
const formAgregarUsuario = document.getElementById('myForm');

formAgregarUsuario.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const razon_social = document.getElementById('razon_social').value;
    const telefono = document.getElementById('telefono').value;
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;


    try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
        }
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch('http://localhost:3009/La_holandesa/create_proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                razon_social,
                telefono,
                descripcion,
                direccion
            })
        });

        if (response.ok) {
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
                title: "Se creo el proveedor correctamente"
            });
        } else {
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
                title: "Error al crear nuevo proveedor"
            });
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud');
    }
});
//***********************************crear proveedor*************************************/





const getAllProveedor = async () => {
    try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
        }
        const response = await fetch("http://localhost:3009/La_holandesa/proveedor", {
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

const getAllProducto = async () => {
    try {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            // Si el token no está presente, redirigir al usuario a la página de inicio de sesión
            window.location.href = "http://127.0.0.1:5500/frond/Z.administrador/login.html";
            return; // Detener la ejecución del código
        }
        const response = await fetch("http://localhost:3009/La_holandesa/productos", {
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
    const razon_socialSelect = document.getElementById("razonsocial");
    const productoSelect = document.getElementById("producto");

    try {
        const razonsocial = await getAllProveedor(); // Suponiendo que esta función devuelve un array de objetos con id_proveedor y razon_social
        const producto = await getAllProducto(); // Suponiendo lo mismo para los productos

        populateSelect(razon_socialSelect, razonsocial, "razon_social", "razon_social");
        populateSelect(productoSelect, producto, "nombre_producto", "nombre_producto");

        // Inicializa Select2 en los selectores después de haber poblado las opciones
        $(document).ready(function () {
            $('#razonsocial').select2();
            $('#producto').select2();
        });
    } catch (error) {
        console.error("Error al poblar los select:", error);
    }
};

// Llama a esta función para poblar los select cuando la página se carga
populateFormSelects();



//***********************************BUSCAR CLIENTE*************************************/
// Obtener el elemento select por su ID
const form = document.getElementById("buscarproveedor");

// Agregar un evento de escucha para el evento change del select
form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al cambiar el valor

  // Obtener el valor seleccionado del NIT
  const razonsocial = document.getElementById('razonsocial').value;
  
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
      "http://localhost:3009/La_holandesa/busproveedor",
      {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        },
        //: formData, // Usar el FormData que contiene la foto
        body: JSON.stringify({
                razonsocial
            }),
      });

    if (response.ok) {
      const data = await response.json();

      idcliente = data;

      datoscliente(data)
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
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Error al enviar la solicitud");
  }
});

const datoscliente = (data) =>{
    const Inputtelefonoproveedor = document.getElementById('telefonoproveedor');
    const Inputdireccionproveedor = document.getElementById('direccionproveedor');

    if (data.data && data.data.length > 0) {
        const { telefono, direccion } = data.data[0];
        Inputtelefonoproveedor.value = telefono;
        Inputdireccionproveedor.value = direccion;
    } else {
        Inputtelefonoproveedor.value = '';
        Inputdireccionproveedor.value = '';
    }
}
//***********************************BUSCAR CLIENTE************************************/




//***********************************BUSCAR PRODUCTO*************************************/
// Obtener el elemento select por su ID
const formulairo = document.getElementById("buscarproducto");

// Agregar un evento de escucha para el evento change del select
formulairo.addEventListener('submit', async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al cambiar el valor

  // Obtener el valor seleccionado del NIT
  const producto = document.getElementById('producto').value;
  
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
      "http://localhost:3009/La_holandesa/busproducto",
      {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        },
        //: formData, // Usar el FormData que contiene la foto
        body: JSON.stringify({
                producto
            }),
      });

    if (response.ok) {
      const data = await response.json();
      
      idproducto = data;

      datosproducto(data)
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
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Error al enviar la solicitud");
  }
});

const datosproducto = (data) => {
    const Inputstock = document.getElementById('stock');
    const Inputpreciounitario = document.getElementById('preciounitario');

    if (data.data && data.data.length > 0) {
        const { stock, precio } = data.data[0];
        Inputstock.value = stock;
        Inputpreciounitario.value = precio;

        if (stock < 5) {
            Inputstock.classList.add('low-stock');
        } else {
            Inputstock.classList.remove('low-stock');
        }
    } else {
        Inputstock.value = '';
        Inputpreciounitario.value = '';
        Inputstock.classList.remove('low-stock');
    }
};

// Añadimos el CSS dinámicamente a la página
const style = document.createElement('style');
style.innerHTML = `
  @keyframes blink {
    0% { box-shadow: 0 5 8px red; }
    50% { box-shadow: 0 0 13px red; }
    100% { box-shadow: 0 5 8px red; }
  }
  .low-stock {
    animation: blink 1s infinite;
  }
`;
document.head.appendChild(style);

// Ejemplo de llamada a datosproducto para probar la funcionalidad
const mockData = {
  data: [
    { stock: 4, precio: 100.00 }
  ]
};


const cantidadInput = document.getElementById("cantidad");
    const preciounitarioInput = document.getElementById("preciounitario");
    const preciototalInput = document.getElementById("preciototal");


    // Evento input para capturar cambios en el campo de cantidad
    cantidadInput.addEventListener('input', function () {
        const cantidad = parseFloat(cantidadInput.value);
        const preciounitario = parseFloat(preciounitarioInput.value);


        if (!isNaN(cantidad) && cantidad > 0) {
            const precioTotal = preciounitario * cantidad ;
            //preciototalInput.value = precioTotal.toFixed(2); // Redondea a dos decimales
            preciototalInput.value = precioTotal.toFixed(2); // Redondea a dos decimales
        } else {
            preciototalInput.value = '0.00';
        }
    });

    // Evento change para el select del producto para actualizar el precio unitario y el stock
    const productoSelect = document.getElementById("producto");
    productoSelect.addEventListener('change', function () {
        const selectedOption = productoSelect.options[productoSelect.selectedIndex];

        // Aquí debes obtener el precio y el stock del producto seleccionado
        // Por simplicidad, se asignan valores fijos
        precioUnitario = parseFloat(selectedOption.getAttribute('data-precio')) || 0;
        const stock = parseInt(selectedOption.getAttribute('data-stock')) || 0;

        document.getElementById('stock').value = stock;

        // Actualiza el precio total si hay una cantidad ya ingresada
        const cantidad = parseFloat(cantidadInput.value);
        if (!isNaN(cantidad) && cantidad > 0) {
            const precioTotal = cantidad * precioUnitario;
            preciototalInput.value = precioTotal.toFixed(2);
        } else {
            preciototalInput.value = '0.00';
        }
    });
//***********************************BUSCAR PRODUCTO************************************/



//***********************************AGREGAR PRODUCTO*************************************/
//let codigo = 1; // Inicia en 1 porque no hay productos en la tabla inicialmente

    // Actualizar el precio total automáticamente cuando se cambie cantidad o precio unitario
    document.getElementById('cantidad').addEventListener('input', actualizarPrecioTotal);
    document.getElementById('preciounitario').addEventListener('input', actualizarPrecioTotal);

    function actualizarPrecioTotal() {
      const cantidad = parseFloat(document.getElementById('cantidad').value);
      const preciounitario = parseFloat(document.getElementById('preciounitario').value);
      if (!isNaN(cantidad) && !isNaN(preciounitario)) {
        document.getElementById('preciototal').value = (cantidad * preciounitario).toFixed(2);
      }
    }

    let productosAgregados = [];

    // Manejar el evento de submit del formulario
    document.getElementById('agregarproducto').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Capturar datos del formulario
      const id = idproducto.data[0].id_producto;
      const producto = document.getElementById('producto').value;
      const cantidad = parseFloat(document.getElementById('cantidad').value);
      const preciounitario = parseFloat(document.getElementById('preciounitario').value);
      const preciototal = parseFloat(document.getElementById('preciototal').value);
  

      // Agregar el producto al array de productos agregados
      productosAgregados.push({
        id: id,
        producto: producto,
        cantidad: cantidad,
        preciounitario: preciounitario,
        preciototal: preciototal
      });

      console.log(productosAgregados)

      // Agregar la nueva fila a la tabla
      const tableBody = document.getElementById('productos');
      const newRow = document.createElement('tr');
      newRow.dataset.id = id; // Almacena el ID del producto en el atributo de datos


      newRow.innerHTML = `
          <td>${id}</td>
          <td>${producto}</td>
          <td>${cantidad}</td>
          <td>${preciounitario.toFixed(2)}</td>
          <td>${preciototal.toFixed(2)}</td>
          <td><button class="btn btn-danger eliminar">Eliminar</button></td>
      `;
  
      tableBody.appendChild(newRow);
  
      // Actualizar totales
      actualizarTotales(preciototal);
  
      // Limpiar el formulario
      document.getElementById('agregarproducto').reset();
      document.getElementById('preciototal').value = '';
  });
  
  // Eliminar una fila
  document.getElementById('productos').addEventListener('click', function(event) {
      if (event.target.classList.contains('eliminar')) {
          const fila = event.target.closest('tr');
          const id = fila.dataset.id; // Recuperar el ID del producto
          const preciototal = parseFloat(fila.children[4].textContent);
  
          // Restar el precio total del producto eliminado
          actualizarTotales(-preciototal);
  
          // Eliminar la fila
          fila.remove();
  
           // Eliminar el producto del array de productos agregados
        eliminarProductoDelArray(id);
    }
});

// Función para eliminar un producto del array de productos agregados
function eliminarProductoDelArray(id) {
  const index = productosAgregados.findIndex(producto => producto.id == id);
  if (index !== -1) {
      productosAgregados.splice(index, 1);
  }
  console.log('Producto eliminado del array:', productosAgregados);
}


  

    // Actualizar totales
    function actualizarTotales(precioCambio) {
      const subTotalElem = document.getElementById('subTotal');
      //const igvElem = document.getElementById('igv');
      const totalElem = document.getElementById('total');

      let subTotal = parseFloat(subTotalElem.textContent);
      subTotal += parseFloat(precioCambio);

      //const igv = subTotal * 0.18;
      //const total = subTotal + igv;
      const total = subTotal;

      subTotalElem.textContent = subTotal.toFixed(2);
      //igvElem.textContent = igv.toFixed(2);
      totalElem.textContent = total.toFixed(2);
    }
//***********************************AGREGAR PRODUCTO*************************************/



//***********************************GENERAR VENTA*************************************/
// Obtener el elemento select por su ID
const generarventa = document.getElementById("generarventa");

// Agregar un evento de escucha para el evento change del select
generarventa.addEventListener('submit', async function (event) {
  event.preventDefault(); // Evitar que se recargue la página al cambiar el valor

  // Obtener el valor seleccionado del NIT
  const {id} = await datosUsuario;
  const id_usuario = id;
  //const {id_producto} = idproducto.data[0];
  //const id_Producto = id_producto
  const {id_cliente} = idcliente.data[0];
  const id_Cliente = id_cliente;
  const total = parseFloat(document.getElementById('total').textContent);


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
      "http://localhost:3009/La_holandesa/geneventa",
      {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        },
        //: formData, // Usar el FormData que contiene la foto
        body: JSON.stringify({
                id_usuario,
                id_Cliente,
                total,
                productos: productosAgregados 
            }),
      });

    if (response.ok) {
      const Data = await response.json();
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: Data.message,
      });
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
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    alert("Error al enviar la solicitud");
  }
});

//***********************************GENERAR VENTA*************************************/


  //*************************************notificaciones**************************************/
  
  const getAllProductos = async () => {
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
