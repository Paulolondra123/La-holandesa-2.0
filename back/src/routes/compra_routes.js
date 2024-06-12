/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/compra_controller')


// Ruta para obtener todas las medidas
router.get('/compras',Users.getAll)
// Ruta para obtener los datos del proveedor
router.post('/busproveedor',Users.busproveedor)
// Ruta para obtener los datos del producto
router.post('/busproducto',Users.busproducto)
// Ruta para obtener los datos del producto
router.post('/genecompra',Users.genecompra)
 
module.exports = router 