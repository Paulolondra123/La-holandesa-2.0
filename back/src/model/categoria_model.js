/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {
  connectToPostgres,
  disconnectFromPostgres,
} = require("../config/index");
const bcrypt = require("bcryptjs");
const pg = require("pg");

class Usersmodel {
  // Método para obtener todas las categorias
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }
      const result = await pool.query("SELECT * FROM categoria");
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return {
          data: null,
          error: true,
          message: "No hay categorias registrados",
        };
      }
      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  // Función para crear un nueva categoria
  static async createUser(nombre_categoria, descripcion) {
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
      const fecha_registro = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      // Consulta para insertar una nueva categoria en la base de datos
      const query = `
            INSERT INTO categoria (nombre_categoria, descripcion, fecha_registro)
            VALUES ($1, $2, $3)
            RETURNING *;
          `;

      // Ejecutar la consulta con parámetros
      const result = await pool.query(query, [
        nombre_categoria,
        descripcion,
        fecha_registro,
      ]);

      console.log("Categoria creado correctamente");
      return true;
    } catch (error) {
      console.error("Error al crear la categoria:", error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  // Metodo para actualizar la categoria
  static async updateUser(id_categoria, nombre_categoria, descripcion) {
    let pool;
    try {
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con PostgreSQL");
      }

      // Consulta para actualizar una categoria en la base de datos
      const query = `
            UPDATE categoria
            SET nombre_categoria = $1, descripcion = $2
            WHERE id_categoria = $3
          `;

      // Ejecutar la consulta con parámetros
      await pool.query(query, [nombre_categoria, descripcion, id_categoria]);

      console.log("Categoria actualizado correctamente");
      return true;
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }

  // Método para cambiar el estado de una categoria
  static async changeState(userId, state) {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error("Error al conectar con MSSQL");
      }
      /* console.log("lol") */
      /* const request = pool.request(); */
      // Actualizar el estado de una categoria en la base de datos
      await pool.query(
        `UPDATE categoria SET estado = ${state} WHERE id_categoria = ${userId}`
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
      await pool.query(`DELETE FROM categoria WHERE id_categoria = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
      return false;
    }
  }
}

module.exports = Usersmodel;
