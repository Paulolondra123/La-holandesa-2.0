const { connectToPostgres, disconnectFromPostgres } = require("../config/index");
const bcrypt = require("bcryptjs");

class UsersModel {
    // Método para encontrar un usuario por ID
    static async findById(userId) {
        const pool = await connectToPostgres();
        const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [userId]);
        await disconnectFromPostgres(pool);
        return result.rows[0];
    }

    // Método para actualizar la contraseña de un usuario
    static async updatePassword(userId, nuevaContraseña, contraseñaActual) {
        let pool;
        try {
            console.log("sdgsdgshs")
            console.log(nuevaContraseña)
            console.log(contraseñaActual)

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

            // Verificar la contraseña actual
            const isMatch = await bcrypt.compare(contraseñaActual, user.contraseña);
            if (!isMatch) {
                throw new Error('Contraseña actual incorrecta');
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

module.exports = UsersModel;
