/*****************conection 3*********************/

const express = require('express')
const router = express.Router()
const Users = require('../controller/usuario_controller')
const multer = require('multer');

const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria


const upload = multer({ storage: storage });


// Ruta para obtener todos los usuarios
router.get('/Users',Users.getAll)
// Ruta para cambiar el estado de un usuario
router.put('/Users/:userId/state', Users.changeState);
/* // Ruta para crear un nuevo usuario
router.post('/create_users', upload.single("foto"), Users.createUser); */
// Ruta para crear un nuevo usuario
router.post('/create_users', Users.createUser);
// Ruta para actualizar un usuario existente
router.put('/Users/:id_usuario', Users.updateUser); 
// Ruta para eliminar un usuario
router.delete('/Users_delete/:userId', Users.deleteUser);

module.exports = router