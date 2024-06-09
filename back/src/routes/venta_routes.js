/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/venta_controller')


// Ruta para obtener todas las medidas
router.get('/ventas',Users.getAll)
// Ruta para obtener los datos del cliente
router.post('/buscliente',Users.buscliente)
// Ruta para obtener los datos del producto
router.post('/busproducto',Users.busproducto)
// Ruta para obtener los datos del producto
router.post('/geneventa',Users.geneventa)

 
module.exports = router 