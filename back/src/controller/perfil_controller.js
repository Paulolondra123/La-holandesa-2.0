const UsersModel = require('../model/perfil_model'); // Asegúrate de que este es el modelo correcto

class UserController {
    static async changePassword(req, res) {
        try {
            const { contraseñaActual, nuevaContraseña } = req.body;
            const userId = req.body.userId; // Obteniendo el ID del usuario desde el cuerpo de la solicitud
            console.log(userId)
            console.log(nuevaContraseña)
            console.log(contraseñaActual)
            // Actualizar la contraseña en la base de datos
            const isUpdated = await UsersModel.updatePassword(userId, nuevaContraseña, contraseñaActual);

            if (isUpdated) {
                res.status(200).json({ message: 'Contraseña actualizada correctamente' });
            } else {
                res.status(400).json({ error: 'Error al actualizar la contraseña' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message || 'Error al actualizar la contraseña' });
        }
    }
}

module.exports = UserController;
