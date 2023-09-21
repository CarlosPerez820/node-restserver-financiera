const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //PATH'S
        this.usuariosPath = '/api/usuarios';
        this.clientesPath = '/api/clientes';
        this.gestoresPath = '/api/gestores';
        this.interesPath = '/api/interes';
        this.pagosPath = '/api/pagos';
        this.parametrosPath = '/api/parametros';
        this.prestamosPath = '/api/prestamos';
        this.solitudesPath = '/api/solicitudes';
        this.authPath = '/api/auth';
        this.buscarPath = '/api/buscar';
        this.uploads = '/api/uploads';
        this.seguimientosPath = '/api/seguimientos';
        //Conectar a BD
        this.conectarBD();
        //Middlewares 
        this.middlewares();
        //Rutas de aplicacion
        this.routes();
    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Manejo de carga de archivos
        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        this.app.use(this.clientesPath, require('../routes/cliente'));
        this.app.use(this.gestoresPath, require('../routes/gestor'));
        this.app.use(this.interesPath, require('../routes/interes'));
        this.app.use(this.pagosPath, require('../routes/pago'));
        this.app.use(this.parametrosPath, require('../routes/parametro'));
        this.app.use(this.prestamosPath, require('../routes/prestamo'));
        this.app.use(this.solitudesPath, require('../routes/solicitud'));
        this.app.use(this.buscarPath, require('../routes/buscar'));
        this.app.use(this.uploads, require('../routes/uploads'));
        this.app.use(this.seguimientosPath, require('../routes/seguimiento'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Corriendo en el puerto", this.port);
        });
    }

}

module.exports = Server;