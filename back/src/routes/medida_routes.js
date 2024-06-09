/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/medida_controller')


// Ruta para obtener todas las medidas
router.get('/medida',Users.getAll)
// Ruta para cambiar el estado de una medida
router.put('/medida/:userId/state', Users.changeState);
// Ruta para crear una nueva medida
router.post('/create_medida', Users.createUser);
// Ruta para actualizar una medida existente
router.put('/medida/:id_medida', Users.updateUser);
// Ruta para eliminar una medida
router.delete('/medida_delete/:userId', Users.deleteUser);
 
module.exports = router 