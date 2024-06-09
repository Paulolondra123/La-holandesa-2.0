/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {connectToPostgres,disconnectFromPostgres,} = require("../config/index");
  
class DashboardModel {
    static async getUsuariosCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM usuario');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de usuarios:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de usuarios' });
        }
    }

    static async getClientesCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM cliente');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de clientes:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de clientes' });
        }
    }

    static async getProductosCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM producto');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de productos:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de productos' });
        }
    }

    static async getVentasCount(req, res) {
        try {
            const pool = await connectToPostgres();
            const result = await pool.query('SELECT COUNT(*) AS count FROM venta');
            await disconnectFromPostgres(pool); // Disconnect from the database
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener el conteo de ventas:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de ventas' });
        }
    }
}

module.exports = DashboardModel;
