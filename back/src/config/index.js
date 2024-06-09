/********************conection db**********************/

/* const mssql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
    user: 'pauloo',    
    password: '123456789',
    server: 'localhost', // Puedes cambiar esto por la dirección de tu servidor SQL Server
    database: 'sistema_de_compra_venta_para_la_holandesa',
    options: {
        encrypt: true, // Si estás usando una conexión encriptada, por ejemplo, con Azure
        trustServerCertificate: true
    }
}
    
// Función para conectar a SQL Server
async function connectToMssql() {
    try {
        // Conectar a la base de datos     
        const pool = await mssql.connect(config);
        console.log('Conectado a SQL Server');
        return pool
    } 
    catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    }
}
// Función para desconectar de SQL Server
async function disconnectToMssql() {
    try {
        // Cerrar la conexión
        await mssql.close();
        console.log('Desconectado de SQL Server');
    } 
    catch (error) {
        console.error('Error al desconectar de SQL Server:', error);
    }
}

module.exports = {connectToMssql,disconnectToMssql} */

const { Client } = require('pg'); // Usar el cliente PostgreSQL

// Configuración de la conexión a PostgreSQL
const config = {
  user: 'castro',
  password: 'paulolondra',
  host: 'localhost', // Puedes cambiar esto por la dirección de tu servidor PostgreSQL
  database: 'sistema_de_compra_venta_para_la_holandesa',
  port: 5432 // Puerto predeterminado de PostgreSQL
};

// Función para conectar a PostgreSQL
async function connectToPostgres() {
  try {
    // Crear el cliente de conexión
    const client = new Client(config);

    // Conectar a la base de datos
    await client.connect();
    console.log('Conectado a PostgreSQL');  
    /* const result = await client.query('SELECT * FROM productos');
    console.log(result.rows) */
    return client;
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  }
}

// Función para desconectar de PostgreSQL
async function disconnectFromPostgres(client) {
  try {
    // Cerrar la conexión
    await client.end();
    console.log('Desconectado de PostgreSQL');
  } catch (error) {
    console.error('Error al desconectar de PostgreSQL:', error);
  }
}

module.exports = {connectToPostgres,disconnectFromPostgres};