/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/productos_controller')
const multer = require('multer');

//const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria


//const upload = multer({ storage: storage });


// Ruta para obtener todos los usuarios
router.get('/productos',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/Productos/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_Productos', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/Productos/:id_usuario', Users.updateUser); 
// Ruta para eliminar un usuario
router.delete('/Productos_delete/:userId', Users.deleteUser);
// Ruta para obtener el stock de los productos
router.get('/productos_stock',Users.stock)
module.exports = router