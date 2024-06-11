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
        const result = await pool.query("SELECT * FROM venta");
        await disconnectFromPostgres(pool);
        //console.log(result.rows) 
        if (result.rows.length === 0) {
          return {
            data: null,
            error: true,
            message: "No hay ventas registradas",
          };
        }
        return { data: result.rows, error: false };
      } catch (error) {
        return { data: null, error: true, message: error.message };
      }
    }

    // Método para buscar cliente
    static async buscliente(nit) {
      try {
        const pool = await connectToPostgres();
        if (!pool) {
          throw new Error("Error al conectar con PostgreSQL");
        }


        // Ejecutar la consulta con parámetros
        const result = await pool.query(`SELECT nombre, apellido, id_cliente FROM "cliente" where nit = ${nit}`);

        await disconnectFromPostgres(pool);
        //console.log(result.rows)
        if (result.rows.length === 0) {
          return {
            data: null,
            error: true,
            message: "No hay clientes registrados",
          };
        }
        return { data: result.rows, error: false };
      } catch (error) {
        return { data: null, error: true, message: error.message };
      }
    }

    
    
    // Método para nuscar producto
    static async busproducto(producto) {
      try {
        const pool = await connectToPostgres();
        if (!pool) {
          throw new Error("Error al conectar con PostgreSQL");
        }


        // Ejecutar la consulta con parámetros
        const result = await pool.query(`SELECT stock, precio, id_producto FROM "producto" where nombre_producto = '${producto}'`);

        await disconnectFromPostgres(pool);
        //console.log(result.rows)
        if (result.rows.length === 0) {
          return {
            data: null,
            error: true,
            message: "No hay productos registrados",
          };
        }
        return { data: result.rows, error: false };
      } catch (error) {
        return { data: null, error: true, message: error.message };
      }
    }

   // Método para generar venta
  static async geneventa(id_usuario, id_Cliente, total, productosAgregados) {
    let pool;
    try {
      // Conectar a la base de datos PostgreSQL
      pool = await connectToPostgres();
      if (!pool) {
        throw new Error('Error al conectar con PostgreSQL');
      }

      // Iniciar una transacción
      await pool.query('BEGIN');

      const currentDate = new Date();
      const fecha_registro = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

      // Consulta para insertar una nueva venta en la base de datos
      const queryVenta = `
        INSERT INTO venta (monto_venta, fecha_venta, id_cliente, id_usuario)
        VALUES ($1, $2, $3, $4)
        RETURNING id_venta;
      `;

      // Ejecutar la consulta para insertar la venta y obtener el ID de la venta generada
      const resultVenta = await pool.query(queryVenta, [total, fecha_registro, id_Cliente, id_usuario]);
      const id_venta = resultVenta.rows[0].id_venta;

      // Consulta para insertar los productos vendidos en la tabla de detalle de venta
      const queryDetalleVenta = `
        INSERT INTO detalle_venta (id_venta, id_producto, cantidad_producto, precio_venta)
        VALUES ($1, $2, $3, $4);
      `;

      // Iterar sobre los productos agregados y ejecutar la consulta para cada producto
      for (const producto of productosAgregados) {
        await pool.query(queryDetalleVenta, [id_venta, producto.id, producto.cantidad, producto.preciounitario]);

        // Actualizar el stock del producto en la tabla producto
        const queryActualizarStock = `
          UPDATE producto
          SET stock = stock - $1
          WHERE id_producto = $2;
        `;
        await pool.query(queryActualizarStock, [producto.cantidad, producto.id]);
      }

      // Confirmar la transacción
      await pool.query('COMMIT');

      console.log('Venta generada correctamente');
      return true;
    } catch (error) {
      // Revertir la transacción en caso de error
      if (pool) {
        await pool.query('ROLLBACK');
      }
      console.error('Error al generar venta:', error);
      return false;
    } finally {
      // Desconectar de la base de datos
      if (pool) {
        await disconnectFromPostgres(pool);
      }
    }
  }
  }
  
  module.exports = Usersmodel;
  