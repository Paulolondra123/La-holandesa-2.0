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

    // Método para actualizar la contraseña de un usuario
    static async updatePassword(userId, nuevaContraseña) {
        let pool;
        try {
            console.log("sdgsdgshs")
            console.log(nuevaContraseña)

            pool = await connectToPostgres();
            if (!pool) {
                throw new Error('Error al conectar con PostgreSQL');
            }

            // Buscar el usuario por ID
            const userResult = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [userId]);
            const user = userResult.rows[0];

            if (!user) {
                throw new Error('Usuario no encontrado');
            }


            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

            // Actualizar la contraseña en la base de datos
            const query = `
                UPDATE usuario SET contraseña = $1 WHERE id_usuario = $2
                RETURNING *;
            `;

            const result = await pool.query(query, [hashedPassword, userId]);

            if (result.rowCount === 0) {
                throw new Error('No se pudo actualizar la contraseña');
            }

            return true;
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            throw error;
        } finally {
            if (pool) {
                await disconnectFromPostgres(pool);
            }
        }
    }
}

module.exports = buscarusers;
