/*****************conection 2*********************/

const Usersmodel = require('../model/proveedor_modelo') // Importa el modelo ProductosModel

class Users {
    // Método para obtener todos los proveedores
    static async getAll(req, res) {
        try {
            /* const { data, error, message } = await Usersmodel.getAll(); */
            const data = await Usersmodel.getAll();

            if (!data) {
                return res.status(404).json({ error: message });
            }
            /* console.log(data) */
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Método para agregar unu nuevo proveedor
    static async createUser(req, res) {
        try {
            const { razon_social, telefono, descripcion, direccion } = req.body;

            // Llamar al método para crear el proveedor en el modelo
            const result = await Usersmodel.createUser(razon_social, telefono, descripcion, direccion);

            // Verificar si el proveedor se creó correctamente en el modelo
            if (result) {
                // Proveedor creado correctamente
                res.status(200).json({ message: 'Proveedor creado correctamente' });
            } else {
                // Error al crear el proveedor en el modelo
                res.status(500).json({ error: 'Error al crear al proveedor' });
            }
        } catch (error) {
            console.error('Error al crear al proveedor:', error);
            res.status(500).json({ error: 'Error al crear al proveedor' });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id_proveedor } = req.params;
            const { razon_social, telefono, descripcion, direccion } = req.body;

            // Llamar al método para actualizar el proveedor en el modelo
            const result = await Usersmodel.updateUser(id_proveedor, razon_social, telefono, descripcion, direccion);

            // Verificar si el proveedor se actualizó correctamente en el modelo
            if (result) {
                // Proveedor actualizado correctamente
                res.status(200).json({ message: 'Proveedor actualizado correctamente' });
            } else {
                // Error al actualizar el provedor en el modelo
                res.status(500).json({ error: 'Error al actualizar el proveedor' });
            }
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            res.status(500).json({ error: 'Error al actualizar el proveedor' });
        }
    }
    // Método para cambiar el estado de un usuario
    static async changeState(req, res) {
        try {
            const userId = req.params.userId;
            const { state } = req.body;
            // Llamar al método para cambiar el estado del usuario en el modelo
            const result = await Usersmodel.changeState(userId, state);
            
            res.status(200).json({ message: 'Estado del proveedor cambiado correctamente' });
        } catch (error) {
            console.error('Error al cambiar el estado del proveedor:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    // Método para eliminar usuario de la data base
    static async deleteUser(req, res) {
        try {
            const userId = req.params.userId;

            // Llamar al método para eliminar el usuario en el modelo
            const result = await Usersmodel.deleteUser(userId);

            // Crear el objeto de respuesta
            const responseObj = { message: "Proveedor eliminado correctamente" };

            // Enviar la respuesta
            res.status(200).json(responseObj);
        } catch (error) {
            console.error("Error al eliminar el proveedor:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports = Users 