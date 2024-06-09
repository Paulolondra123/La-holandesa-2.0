/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/compra_controller')


// Ruta para obtener todas las medidas
router.get('/compras',Users.getAll)

 
module.exports = router 