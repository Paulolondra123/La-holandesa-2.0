/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const { connectToPostgres, disconnectFromPostgres } = require('../config/index');
const bcrypt = require('bcryptjs');
const pg = require('pg');

class Usersmodel {
  // Método para obtener todos los proveedores
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query('SELECT * FROM proveedor');
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay proveedores registrados' };
      }
      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }
  // Función para crear un nuevo proveedor
  static async createUser(razon_social, telefono, descripcion, direccion) {
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

      // Consulta para insertar unun nuevo proveedor en la base de datos
      const query = `
            INSERT INTO proveedor (razon_social, telefono, descripcion, direccion, fecha_registro)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
          `;

      // Ejecutar la consulta con parámetros
      const result = await pool.query(query, [
        razon_social,
        telefono,
        descripcion,
        direccion,
        fecha_registro
      ]);

      console.log('Proveedor creado correctamente');
      return true;
    } catch (error) {
      console.error('Error al crear el proveedor:', error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Metodo para actualizar el proveedor
  static async updateUser(id_proveedor, razon_social, telefono, descripcion, direccion) {
    let pool;
    try {
      console.log(id_proveedor, razon_social, telefono, descripcion, direccion)
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }

      // Consulta para actualizar un proveedor en la base de datos
      const query = `
            UPDATE proveedor
            SET razon_social = $1, telefono = $2, descripcion = $3, direccion = $4
            WHERE id_proveedor = $5
          `;

      // Ejecutar la consulta con parámetros
      await pool.query(query, [
        razon_social,
        telefono,
        descripcion,
        direccion,
        id_proveedor
      ]);

      console.log('Proveedor actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
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
        throw new Error('Error al conectar con MSSQL');
      }
      /* const request = pool.request(); */
      // Actualizar el estado del usuario en la base de datos
      await pool.query(`UPDATE proveedor SET estado = ${state} WHERE id_proveedor = ${userId}`);
      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      return false;
    }
  }
  // Método para eliminar proveedor de la data base
  static async deleteUser(userId) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Eliminar el usuario de la base de datos
      await pool.query(`DELETE FROM proveedor WHERE id_proveedor = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar al proveedor:", error);
      return false;
    }
  }
}


module.exports = Usersmodel 