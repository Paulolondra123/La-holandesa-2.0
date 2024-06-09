/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const UserController = require('../controller/perfil_controller');
const jwt = require("jsonwebtoken");


// Endpoint para verificar autenticación
router.get("/usuario_aut",(req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, 'secretkey');
            res.status(200).json(decoded)
        } else {
            res.status(401).json({ message: "Token no proporcionado" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
});

router.put('/cambiar_contrasena', UserController.changePassword);

module.exports = router 