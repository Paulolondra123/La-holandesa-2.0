/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const { connectToPostgres, disconnectFromPostgres } = require('../config/index');
const bcrypt = require('bcryptjs');
const pg = require('pg');



// Función para convertir la imagen en datos binarios
/* async function convertImageToBinary(image) {
  return new Promise((resolve, reject) => {
      try {
          const reader = new FileReader();
          reader.readAsArrayBuffer(image); // Leer el archivo como un ArrayBuffer
          reader.onload = () => {
              const arrayBuffer = reader.result; // Obtener el ArrayBuffer
              const buffer = Buffer.from(arrayBuffer); // Convertir el ArrayBuffer en un Buffer
              resolve(buffer); // Devolver el Buffer
          };
          reader.onerror = error => reject(error);
      } catch (error) {
          reject(error);
      }
  });
} */


class Usersmodel {
  // Método para obtener todos los usuarios
  static async getAll() {
    try {
      const pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }
      const result = await pool.query('SELECT * FROM usuario');
      await disconnectFromPostgres(pool);
      /* console.log(result.rows) */
      if (result.rows.length === 0) {
        return { data: null, error: true, message: 'No hay usuarios registrados' };
      }

      /* const rows = result.rows.map(row =>  {
        return {...row, foto: row.foto? Buffer.from(row.foto).toString('base64') : null}
      }) 

      return { data: rows, error: false };*/

      return { data: result.rows, error: false };
    } catch (error) {
      return { data: null, error: true, message: error.message };
    }
  }

  // Método para agregar un nuevo usuario
  static async createUser(nombres, apellidos, perfil, usuario, contraseña) {
    let pool;
    try {
      console.log(nombres, apellidos, perfil, usuario, contraseña)
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

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        console.log(nombres, apellidos, perfil, usuario, contraseña);

        // Convertir la imagen en datos binarios
        // const fotoData = await convertImageToBinary(foto);
        /* const archivoBytea = foto.buffer;
        console.log(archivoBytea); */

        // Consulta para insertar un nuevo usuario en la base de datos
        const query = `
            INSERT INTO usuario (nombres, apellidos, perfil, usuario, contraseña, fecha_registro)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        // Ejecutar la consulta con parámetros
        const result = await pool.query(query, [
            nombres,
            apellidos,
            //archivoBytea, // Pasar los datos binarios de la imagen
            perfil,
            usuario,
            hashedPassword,
            fecha_registro
        ]);

        console.log('Usuario creado correctamente');
        return true;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return false;
    } finally {
        // Desconectar de la base de datos
        if (pool) {
            await disconnectFromPostgres(pool);
        }
    }
}

  // Metodo para actualizar el usuario
  static async updateUser(id_usuario, nombres, apellidos, usuario) {
    let pool;
    try {
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }

      // Consulta para actualizar un usuario en la base de datos
      const query = `
            UPDATE usuario
            SET nombres = $1, apellidos = $2, usuario = $3
            WHERE id_usuario = $4
          `;

      // Ejecutar la consulta con parámetros
      await pool.query(query, [nombres, apellidos, usuario, id_usuario]);

      console.log('Usuario actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
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
      await pool.query(`UPDATE usuario SET estado = ${state} WHERE id_usuario = ${userId}`);
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
      await pool.query(`DELETE FROM usuario WHERE id_usuario = ${userId}`);

      await disconnectFromPostgres(pool);
      return true;
    } catch (error) {
      console.error("Error al eliminar al usuario:", error);
      return false;
    }
  }
}


module.exports = Usersmodel