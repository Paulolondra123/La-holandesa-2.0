    /*****************conection 4 servidor*********************/

    const express = require ('express')
    const session = require('express-session');
    const dotenv = require('dotenv')
    const cookie = require('cookie-parser')
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const path = require('path');

    dotenv.config()

    const server = express()

    const PORT = process.env.PORT || 3000 

    const router_login_logout_verify = require('./back/src/routes/login_routes')
    const routerusuario = require('./back/src/routes/usuario_routes')
    const routerperfil = require('./back/src/routes/perfil_routes')
    const routerdashboard = require('./back/src/routes/dashboard_routes')
    const routercategoria = require('./back/src/routes/categoria_routes')
    const routermedida = require('./back/src/routes/medida_routes')
    const routerproveedor = require('./back/src/routes/proveedor_router')
    const routercliente = require('./back/src/routes/cliente_routes')    
    const routerproducto = require('./back/src/routes/productos_routes')
    const routerventa = require('./back/src/routes/venta_routes')
    const routercompra = require('./back/src/routes/compra_routes')


    // Configurar express-session
    server.use(session({
        secret: 'secretkey', // Clave secreta para firmar las cookies de sesión
        resave: true,
        saveUninitialized: true
    }));
  
    // Habilitar CORS para permitir solicitudes desde http://127.0.0.1:5500
    const corsOptions = {
        origin: ['http://127.0.0.1:5500', 'https://la-holandesa-paulolondra123-paulolondra123s-projects.vercel.app', 'https://la-holandesa-2-0.vercel.app'],  // Permitir solicitudes solo desde este origen
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'], // Encabezados permitidos
        credentials: true // Permitir el intercambio de cookies entre orígenes
    }
    /* server.use((req,res , next)=>{
        res.setHeader("Access-Control-Allow-Origin","*")
        res.setHeader("Access-Control-Allow-Methods","*")
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Credentials",true)
        next()
    }) */

    server.use(cookie());
    server.use(bodyParser.json());
    server.use(cors(corsOptions)); // Habilitar CORS con las opciones definidas

    // Sirve los archivos estáticos desde el directorio "frond"
    server.use(express.static(path.join(__dirname, 'frond')));

    // Define un middleware de autenticación
    const authMiddleware = (req, res, next) => {
        // Obtener el token de la solicitud (desde el encabezado Authorization)
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        //console.log("Token JWT:", token); // Imprimir el token JWT en la consola

        if (!token) {
        // Si no hay token, el usuario no está autenticado
        return res.status(401).json({ message: "Acceso no autorizado" });
        }
    
        try {
        // Verificar el token
        const decoded = jwt.verify(token, 'secretkey');
        //console.log(decoded)

        //console.log("Token JWT:", decoded); // Imprimir el token JWT en la consola
        req.user = decoded;
        // Verificar si isAuthenticated está presente y es true
        if (decoded.isAuthenticated === true) {
            // El usuario está autenticado, continuar con la solicitud
            next();
        } else {
            // Si no hay token, el usuario no está autenticado
            // Redirigir al usuario a la página de inicio de sesión
            console.log("REDIRECCIONAR")
            return res.redirect("http://la-holandesa-paulolondra123-paulolondra123s-projects.vercel.app/frond/Z.administrador/usuarios.html");
        }
        } catch (error) {
        // Error al verificar el token
        return res.status(401).json({ message: "Token inválido" });
        } 
    }; 

    server.use('/La_holandesa', router_login_logout_verify )
    server.use('/La_holandesa',authMiddleware, routerusuario )
    server.use('/La_holandesa',authMiddleware, routerperfil)
    server.use('/La_holandesa',authMiddleware, routerdashboard)
    server.use('/La_holandesa',authMiddleware, routercategoria )
    server.use('/La_holandesa',authMiddleware, routermedida )
    server.use('/La_holandesa',authMiddleware, routerproveedor )
    server.use('/La_holandesa',authMiddleware, routercliente )
    server.use('/La_holandesa',authMiddleware, routerproducto )
    server.use('/La_holandesa',authMiddleware, routerventa )
    server.use('/La_holandesa',authMiddleware, routercompra )



    // Rutas para servir otros archivos HTML
    server.get('/usuarios.html', (req, res) => {
        res.sendFile(path.join(__dirname, 'frond', 'Z.administrador', 'usuarios.html'));
    });
    
    
    // Redirige todas las rutas al archivo index.html de tu frontend
    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frond', 'Z.administrador', 'index.html'));
    });

    server.listen(PORT,() =>{
        console.log(`servidor corriendo en http://localhost:${PORT}`);
    })

    /* server.get ('/', (req, res) => {
        res.send('Api Proyect')
    })

    server.listen(PORT,() =>{
        console.log(`servidor corriendo en http://localhost:${PORT}`);
    })
 */