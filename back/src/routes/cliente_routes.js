/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/cliente_controller')


// Ruta para obtener todos los usuarios
router.get('/cliente',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/cliente/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_cliente', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/cliente/:id_cliente', Users.updateUser);
// Ruta para eliminar un proveedor
router.delete('/cliente_delete/:userId', Users.deleteUser);
 
 
module.exports = router 