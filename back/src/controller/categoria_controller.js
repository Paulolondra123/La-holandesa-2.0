/*****************conection 2*********************/

const Usersmodel = require("../model/categoria_model"); // Importa el modelo ProductosModel

class Users {
  // Método para obtener todas las categorias
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

  // Método para agregar una nueva categoria
  static async createUser(req, res) {
    try {
      const { nombre_categoria, descripcion } = req.body;

      // Llamar al método para crear la categoria en el modelo
      const result = await Usersmodel.createUser(nombre_categoria, descripcion);

      // Verificar si la categoria se creó correctamente en el modelo
      if (result) {
        // Usuario creado correctamente
        res.status(200).json({ message: "Categoria creado correctamente" });
      } else {
        // Error al crear la categoria en el modelo
        res.status(500).json({ error: "Error al crear la categoria" });
      }
    } catch (error) {
      console.error("Error al crear la categoria:", error);
      res.status(500).json({ error: "Error al crear la categoria" });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id_categoria } = req.params;
      const { nombre_categoria, descripcion } = req.body;

      // Llamar al método para actualizar la categoria en el modelo
      const result = await Usersmodel.updateUser(
        id_categoria,
        nombre_categoria,
        descripcion
      );

      // Verificar si la categoria se actualizó correctamente en el modelo
      if (result) {
        // Categoria actualizado correctamente
        res
          .status(200)
          .json({ message: "Categoria actualizado correctamente" });
      } else {
        // Error al actualizar la categoria en el modelo
        res.status(500).json({ error: "Error al actualizar la categoria" });
      }
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
      res.status(500).json({ error: "Error al actualizar la categoria" });
    }
  }

  // Método para cambiar el estado de una categoria
  static async changeState(req, res) {
    try {
      const userId = req.params.userId;
      const { state } = req.body;
      // Llamar al método para cambiar el estado de la categoria en el modelo
      const result = await Usersmodel.changeState(userId, state);

      // Crear el objeto de respuesta
      const responseObj = { message: "Estado de la categoria cambiado correctamente" };

      // Enviar la respuesta
      res.status(200).json(responseObj);
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
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
      const responseObj = { message: "Categoria eliminada correctamente" };

      // Enviar la respuesta
      res.status(200).json(responseObj);
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = Users;
