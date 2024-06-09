/* const usercontroller = require('../controller/login_controller');

class Token{
    static async token(req, res) {
        const { username, password } = req.body;
        try {
            //console.log("Solicitud de inicio de sesión recibida:", username); // Agrega un registro de consola para la solicitud recibida
            const token = await usercontroller.login(username, password);
            if (typeof token == "string") {
                res.json({ token });       
            } else {
                res.status(403).json(token);    
            }
        } catch (error) {
            console.error("Error al procesar la solicitud de inicio de sesión:", error); // Agrega un registro de consola para cualquier error
            res.status(401).json({ error: error.message });
        }
    }

}

module.exports = Token */
const dotenv = require('dotenv')
dotenv.config()
const LoginController = require('../controller/login_controller');

class Token {
    static async token(req, res) {
        const { username, password } = req.body;
        try {
            // Agregar un registro de consola para la solicitud recibida
            console.log("Solicitud de inicio de sesión recibida:", username);
            
            // Llamar al método de autenticación del controlador de usuarios
            const token = await LoginController.login(username, password);
            
            // Verificar el tipo de token devuelto
            if (typeof token === "string") {
                // Si es una cadena (token válido), responder con el token
                res.json({ token });       
            } else {
                // Si no es una cadena (indicando un error), responder con un código 403
                res.status(403).json(token);    
            }
            /* if (typeof token === 'string') {
                // Si es una cadena (token válido), responder con el token y establecer la cookie
                res.cookie('token', token, {
                    //maxAge: 5 * 60 * 1000, // Tiempo de expiración del token en milisegundos (5 minutos)
                    httpOnly: true, // La cookie solo es accesible desde el servidor (no desde JavaScript en el navegador)
                    //secure: process.env.NODE_ENV === 'production', // Establecer a true en producción para cookies seguras (HTTPS)
                    secure: 'production',
                    sameSite: 'strict' // Controla cómo se envían las cookies en las solicitudes entre sitios
                });
                console.log("Token generado:", token);
                res.json({ token });
            } else {
                // Si no es una cadena (indicando un error), responder con un código 403
                res.status(403).json(token);
            } */
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso de autenticación
            console.error("Error al procesar la solicitud de inicio de sesión:", error);
            // Responder con un código de estado 401 y el mensaje de error
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = Token;
