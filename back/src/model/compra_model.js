/*****************conection 1*********************/

//consultas para obtener datos de base de la db
const {
    connectToPostgres,
    disconnectFromPostgres,
  } = require("../config/index");

  class Usersmodel {
    // Método para obtener todas las medidas
    static async getAll() {
      try {
        const pool = await connectToPostgres();
        if (!pool) {
          throw new Error("Error al conectar con PostgreSQL");
        }
        const result = await pool.query("SELECT * FROM compra");
        await disconnectFromPostgres(pool);
        /* console.log(result.rows) */
        if (result.rows.length === 0) {
          return {
            data: null,
            error: true,
            message: "No hay compras registradas",
          };
        }
        return { data: result.rows, error: false };
      } catch (error) {
        return { data: null, error: true, message: error.message };
      }
    }
  }
  
  module.exports = Usersmodel;
  