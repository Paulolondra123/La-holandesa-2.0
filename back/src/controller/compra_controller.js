/*****************conection 2*********************/

const Usersmodel = require("../model/compra_model"); // Importa el modelo ProductosModel

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

  // Metodo para obtener el proveedor
  static async busproveedor(req, res){
    try {
      const { razonsocial } = req.body;
      
      const data = await Usersmodel.busproveedor(razonsocial);

      // Verificar si la medida se creó correctamente en el modelo
      if (data) {
        // Medida creado correctamente
        res.status(200).json(data);
      } else {
        // Error al crear la medida en el modelo
        res.status(500).json({ error: "Error al buscara proveedor" });
      }
    } catch (error) {
      console.error("Error al buscar proveedor:", error);
      res.status(500).json({ error: "Error al buscar proveedor" });
    }
  }

  // Metodo para obtener el cliente
  static async busproducto(req, res){
    try {
      const { producto } = req.body;
      
      const data = await Usersmodel.busproducto(producto);

      // Verificar si la medida se creó correctamente en el modelo
      if (data) {
        // Medida creado correctamente
        res.status(200).json(data);
      } else {
        // Error al crear la medida en el modelo
        res.status(500).json({ error: "Error al buscara el cliente" });
      }
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      res.status(500).json({ error: "Error al buscar cliente" });
    }
  }

  // Metodo para generar compra
  static async genecompra(req, res) {
    try {
        const { id_usuario, id_Proveedor, total, productos } = req.body;

        // Llamar al método para crear el proveedor en el modelo
        const result = await Usersmodel.genecompra(id_usuario, id_Proveedor, total, productos);

        // Verificar si el proveedor se creó correctamente en el modelo
        if (result) {
            // Proveedor creado correctamente
            res.status(200).json({ message: 'Compra generada correctamente' });
        } else {
            // Error al crear el proveedor en el modelo
            res.status(500).json({ error: 'Error al generar la compra' });
        }
    } catch (error) {
        console.error('Error al generar la compra:', error);
        res.status(500).json({ error: 'Error al generar la compra' });
    }
}
}

module.exports = Users;
