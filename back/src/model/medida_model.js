/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {
  connectToPostgres,
  disconnectFromPostgres,
} = require("../config/index");
const bcrypt = require("bcryptjs");
const pg = require("pg");

class Usersmodel {
  // Método para obtener todas las medidas
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }
      const result = await pool.query("SELECT * FROM medida");
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return {
          data: null,
          error: true,
          message: "No hay medidas registrados",
        };
      }
      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }
  // Función para crear un nueva medida
  static async createUser(nombre_medida, descripcion) {
    let pool;
    try {
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Obtener la fecha actual para la fecha de registro
      /* const currentDate = new Date();
      const fecha_registro = currentDate.toISOString(); */
      const currentDate = new Date();
      const fecha_registro = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;


      // Consulta para insertar una nueva medida en la base de datos
      const query = `
            INSERT INTO medida (nombre_medida, descripcion, fecha_registro)
            VALUES ($1, $2, $3)
            RETURNING *;
          `;

      // Ejecutar la consulta con parámetros
      const result = await pool.query(query, [
        nombre_medida,
        descripcion,
        fecha_registro,
      ]);

      console.log("Medida creado correctamente");
      return true;
    } catch (error) {
      console.error("Error al crear la medida:", error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Metodo para actualizar la madida
  static async updateUser(id_medida, nombre_medida, descripcion) {
    let pool;
    try {
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Consulta para actualizar una medida en la base de datos
      const query = `
            UPDATE medida
            SET nombre_medida = $1, descripcion = $2
            WHERE id_medida = $3
          `;

      // Ejecutar la consulta con parámetros
      await pool.query(query, [nombre_medida, descripcion, id_medida]);

      console.log("Medida actualizado correctamente");
      return true;
    } catch (error) {
      console.error("Error al actualizar la medida:", error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Método para cambiar el estado de la medida
  static async changeState(userId, state) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con MSSQL");
      }
      /* const request = pool.request(); */
      // Actualizar el estado del usuario en la base de datos
      await pool.query(
        `UPDATE medida SET estado = ${state} WHERE id_medida = ${userId}`
      );
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
      await pool.query(`DELETE FROM medida WHERE id_medida = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar la medida:", error);
      return false;
    }
  }
}

module.exports = Usersmodel;
