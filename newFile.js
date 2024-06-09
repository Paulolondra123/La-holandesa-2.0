const routerproducto = require('./back/src/routes/productos_routes');
const { server } = require('.');

server.use('/La_holandesa', routerproducto);
