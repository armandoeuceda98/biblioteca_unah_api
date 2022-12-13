const express = require('express');
const cors = require('cors');
const dbConection = require('./database/config');
const init = require("./config/init.config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuario';
        this.autorRoutePath = '/api/autor';
        this.coleccionRoutePath = '/api/coleccion';
        this.edicionRoutePath = '/api/edicion';
        this.editorialRoutePath = '/api/editorial';
        this.estanteRoutePath = '/api/estante';
        this.idiomaRoutePath = '/api/idioma';
        this.libroRoutePath = '/api/libro';
        this.libroAutorRoutePath = '/api/libroAutor';
        this.libroEditorialRoutePath = '/api/libroEditorial';
        this.libroEjemplarRoutePath = '/api/libroEjemplar';
        this.permisoRoutePath = '/api/permiso';
        this.rolPermisoRoutePath = '/api/rolPermiso';
        // this.rolUsuarioRoutePath = '/api/rolUsuario';
        this.rolRoutePath = '/api/rol';
        this.transaccionRoutePath = '/api/transaccion';
        this.reporteRoutePath = '/api/reporte';
        this.rutaAuth = '/api/auth';

        // Midlewares: funciones que siempre se van a ejecutar cuando iniciamos un servidor
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

        //

    async syncDB() {
        try {
            
            const db = require("./models/biblioteca");
            await dbConection.sync({
                force: true
            }).then(() => {
                init.initial();
            });
            console.log('base sincronizada');

        } catch (error) {
            console.log('error pai');
            console.log(error)
        }
    }

    // async dbConnection() {
    //     try {
    //         const db = require("./models/biblioteca");
    //         db.sequelize.sync({ force: true }).then(() => {
    //         });
    //         console.log('La conexión está macanuda');
    //     } catch (error) {
    //         console.log('Error al conectar a la base de datos: ', error);
    //         console.log(error);
    //     }
    // }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json()); // Función de express que permite leer y parsear el body de una petición

        // Directorio público
        this.app.use(express.static('public'));

    }

    // Endpoints 
    routes() {
        // Ruta de usuarios api
        this.app.use(this.usuariosRoutePath, require('./routes/usuario.route'));
        this.app.use(this.autorRoutePath, require('./routes/autor.route'));
        this.app.use(this.coleccionRoutePath, require('./routes/coleccion.route'));
        this.app.use(this.edicionRoutePath, require('./routes/edicion.route'));
        this.app.use(this.editorialRoutePath, require('./routes/editorial.route'));
        this.app.use(this.estanteRoutePath, require('./routes/estante.route'));
        this.app.use(this.idiomaRoutePath, require('./routes/idioma.route'));
        this.app.use(this.libroRoutePath, require('./routes/libro.route'));
        this.app.use(this.libroAutorRoutePath, require('./routes/libro_autor.route'));
        this.app.use(this.libroEditorialRoutePath, require('./routes/libro_editorial.route'));
        this.app.use(this.libroEjemplarRoutePath, require('./routes/libro_ejemplar.route'));
        this.app.use(this.permisoRoutePath, require('./routes/permiso.route'));
        this.app.use(this.rolPermisoRoutePath, require('./routes/rol_permiso.route'));
        // this.app.use(this.rolUsuarioRoutePath, require('./routes/rol_usuario.route'));
        this.app.use(this.rolRoutePath, require('./routes/rol.route'));
        this.app.use(this.transaccionRoutePath, require('./routes/transaccion.route'));
        this.app.use(this.reporteRoutePath, require('./routes/reporte.route'));
        this.app.use(this.rutaAuth, require('./routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}

module.exports = Server;