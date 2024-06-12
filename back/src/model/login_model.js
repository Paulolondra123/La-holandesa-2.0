/*****************conection 1*********************/

/* const {connectToPostgres,disconnectFromPostgres} = require('../config/index')
const bcrypt = require('bcryptjs');

class buscarusers {
    static async getuser(username, password) {
        let pool;
        let response = { data: null, error: null };

        try {
            // Conectarse a la base de datos
            pool = await connectToPostgres();
            if (!pool) {
                throw new Error('Error al conectar con PostgreSQL');
            }
            console.log(username)
            // Consultar la base de datos para obtener el usuario
            const query = `
                SELECT * FROM usuario WHERE usuario = $1
                RETURNING *;
            `;
            // Ejecutar la consulta con parámetros
            const result = await pool.query(query, [
              username,
            ]);
            console.log(result.rows)
            // Verificar si se encontró un usuario
            if (result.rows.length > 0) {
                const user = result.rows[0];
                // Verificar la contraseña
                const passwordMatch = await bcrypt.compare(password, user.contrasena);
                if (!passwordMatch || !user.estado) {
                    response.error = 'Credenciales inválidas';
                } else {
                    response.data = user;
                }
            } else {
                response.error = 'Usuario no encontrado';
            }
        } catch (error) {
            response.error = error.message;
        } finally {
            // Desconectar de la base de datos
            if (pool) {
                await pool.end();
            }
            return response;
        }
    }
}

module.exports = buscarusers */

const { connectToPostgres, disconnectFromPostgres } = require('../config/index');
const bcrypt = require('bcryptjs');

class buscarusers {
    static async getUsuario(username, password) {
        let pool;
        let response = { data: null, error: null };

        try {
            // Conectarse a la base de datos
            pool = await connectToPostgres();
            if (!pool) {
                throw new Error('Error al conectar con PostgreSQL');
            }

            // Consultar la base de datos para obtener el usuario
            const query = `
                SELECT id_usuario, nombres, apellidos, perfil, usuario, contraseña, estado, fecha_registro, primerlogin 
                FROM usuario WHERE usuario = $1;
            `;
            // Ejecutar la consulta con parámetros
            const result = await pool.query(query, [username]);
            console.log(result.rows)

            // Verificar si se encontró un usuario
            if (result.rows.length > 0) {
                const usuario = result.rows[0];
                // Verificar la contraseña
                const passwordMatch = await bcrypt.compare(password, usuario.contraseña);
                
                if (!passwordMatch) {
                    response.error = 'Contraseña incorrecta';
                } else if (!usuario.estado) {
                    response.error = 'Usuario está deshabilitado';
                } else {
                    // Devolver solo los datos necesarios del usuario
                    response.data = {
                        id: usuario.id_usuario,
                        nombres: usuario.nombres,
                        apellidos: usuario.apellidos,
                        usuario: usuario.usuario,
                        perfil: usuario.perfil,
                        fecha_registro: usuario.fecha_registro,
                        primerlogin: usuario.primerlogin,
                        estado: usuario.estado,
                    };
                }
            } else {
                response.error = 'Usuario no encontrado';
            }
        } catch (error) {
            response.error = error.message;
        } finally {
            // Desconectar de la base de datos
            if (pool) {
                await disconnectFromPostgres(pool);
            }
            return response;
        }
    }   
}

module.exports = buscarusers;
