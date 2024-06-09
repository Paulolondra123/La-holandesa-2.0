/*****************conection 2*********************/

const Usersmodel = require("../model/medida_model"); // Importa el modelo ProductosModel

class Users {
  // Método para obtener todas las medidas
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
  // Método para agregar una nueva medida
  static async createUser(req, res) {
    try {
      const { nombre_medida, descripcion } = req.body;

      // Llamar al método para crear una medida en el modelo
      const result = await Usersmodel.createUser(nombre_medida, descripcion);

      // Verificar si la medida se creó correctamente en el modelo
      if (result) {
        // Medida creado correctamente
        res.status(200).json({ message: "Medida creado correctamente" });
      } else {
        // Error al crear la medida en el modelo
        res.status(500).json({ error: "Error al crear el medida" });
      }
    } catch (error) {
      console.error("Error al crear el medida:", error);
      res.status(500).json({ error: "Error al crear el medida" });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id_medida } = req.params;
      const { nombre_medida, descripcion } = req.body;

      // Llamar al método para actualizar la medida en el modelo
      const result = await Usersmodel.updateUser(
        id_medida,
        nombre_medida,
        descripcion
      );

      // Verificar si la medida se actualizó correctamente en el modelo
      if (result) {
        // Medida actualizado correctamente
        res.status(200).json({ message: "Medida actualizado correctamente" });
      } else {
        // Error al actualizar la medida en el modelo
        res.status(500).json({ error: "Error al actualizar la medida" });
      }
    } catch (error) {
      console.error("Error al actualizar la medida:", error);
      res.status(500).json({ error: "Error al actualizar la medida" });
    }
  }
  // Método para cambiar el estado de  una medida
  static async changeState(req, res) {
    try {
      const userId = req.params.userId;
      const { state } = req.body;
      // Llamar al método para cambiar el estado de una medida en el modelo
      const result = await Usersmodel.changeState(userId, state);
      
      res.status(200).json({ message: "Estado de la medida cambiado correctamente" });
    } catch (error) {
      console.error("Error al cambiar el estado de la medida:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  // Método para eliminar usuario de la data base
  static async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      // Llamar al método para eliminar el usuario en el modelo
      const result = await Usersmodel.deleteUser(userId);

      // Crear el objeto de respuesta
      const responseObj = { message: "Medida eliminada correctamente" };

      // Enviar la respuesta
      res.status(200).json(responseObj);
    } catch (error) {
      console.error("Error al eliminar la medida:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = Users;
