/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const { connectToPostgres, disconnectFromPostgres } = require('../config/index');
const bcrypt = require('bcryptjs');
const pg = require('pg');


class Usersmodel {
  // Método para obtener todos los usuarios
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query('SELECT * FROM producto');
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay productos registrados' };
      }

      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  // Método para agregar un nuevo usuario
  static async createUser(nombre_producto, precio, fecha_elaboracion, fecha_vencimiento, categoria, medida ) {
    let pool;
    try {
        // Conectar a la base de datos PostgreSQL
        pool = await connectToPostgres();
        if (!pool) {
            throw new Error('Error al conectar con PostgreSQL');
        }
        // Obtener la fecha actual para la fecha de registro
        /* const currentDate = new Date();
        const fecha_registro = currentDate.toISOString(); */
        const currentDate = new Date();
        const fecha_registro = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const stock = 0
        // Consulta para insertar un nuevo usuario en la base de datos
        const query = `
            INSERT INTO producto (nombre_producto, precio, fecha_elaboracion, fecha_vencimiento, stock, fecha_registro, id_categoria, id_medida)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        // Ejecutar la consulta con parámetros
        const result = await pool.query(query, [
          nombre_producto,
          precio,
          fecha_elaboracion,
          fecha_vencimiento,
          stock,
          fecha_registro,
          categoria,
          medida
        ]);

        console.log('Producto creado correctamente');
        return true;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return false;
    } finally {
        // Desconectar de la base de datos
        if (pool) {
            await disconnectFromPostgres(pool);
        }
    }
}

  // Metodo para actualizar el usuario
  static async updateUser(id_producto, nombre_producto, precio, fecha_elaboracion, fecha_vencimiento) {
    let pool;
    try {
      console.log(id_producto, nombre_producto, precio, fecha_elaboracion, fecha_vencimiento)
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }

      // Consulta para actualizar un usuario en la base de datos
      const query = `
            UPDATE producto
            SET nombre_producto = $1, precio = $2, fecha_elaboracion = $3, fecha_vencimiento = $4
            WHERE id_producto = $5
          `;

      // Ejecutar la consulta con parámetros
      await pool.query(query, [
        nombre_producto, 
        precio, 
        fecha_elaboracion, 
        fecha_vencimiento, 
        id_producto
      ]);

      console.log('Producto actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Método para cambiar el estado de un usuario
  static async changeState(userId, state) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      //const request = pool.request(); 
      // Actualizar el estado del usuario en la base de datos
      await pool.query(`UPDATE producto SET estado = ${state} WHERE id_producto = ${userId}`);
      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      return false;
    }
  }
  // Método para eliminar usuario de la data base
  static async deleteUser(userId) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Eliminar el usuario de la base de datos
      await pool.query(`DELETE FROM producto WHERE id_producto = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar al producto:", error);
      return false;
    }
  }
}


module.exports = Usersmodel