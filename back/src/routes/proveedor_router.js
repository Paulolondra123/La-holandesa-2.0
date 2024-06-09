/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/proveedor_controller')


// Ruta para obtener todos los usuarios
router.get('/proveedor',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/proveedor/:userId/state', Users.changeState);
// Ruta para crear un nuevo usuario
router.post('/create_proveedor', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/proveedor/:id_proveedor', Users.updateUser);
// Ruta para eliminar un proveedor
router.delete('/proveedor_delete/:userId', Users.deleteUser);
 
 
module.exports = router 