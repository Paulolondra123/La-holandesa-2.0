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

        populateSelect(razon_socialSelect, razonsocial, "id_proveedor", "razon_social");
        populateSelect(productoSelect, producto, "id_producto", "nombre_producto");

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

// Agrega este código después de la función populateFormSelects()

const fillContactInfo = () => {
    const razon_socialSelect = document.getElementById("razonsocial");
    const telefonoInput = document.getElementById("telefonoproveedor");
    const direccionInput = document.getElementById("direccionproveedor");

    console.log(telefonoInput)

    /* razon_socialSelect.addEventListener("change", (event) => {
        const selectedProveedorId = event.target.value;
        console.log(selectedProveedorId); // Aquí obtienes el ID del proveedor seleccionado
    
        // Ahora puedes realizar acciones basadas en el ID seleccionado, como buscar información adicional del proveedor
    }); */
    razon_socialSelect.addEventListener("change", (event) => {
        const selectedProveedorId = event.target.value;
        const selectedProveedor = razonsocial.find(proveedor => proveedor.id_proveedor === selectedProveedorId);
        
        if (selectedProveedor) {
            telefonoInput.value = selectedProveedor.telefono;
            direccionInput.value = selectedProveedor.direccion;
        } else {
            // Limpiar los campos si no se selecciona ningún proveedor
            telefonoInput.textContent = "";
            direccionInput.textContent = "";
        }
    });
};

// Llama a esta función después de poblar los select
fillContactInfo();
