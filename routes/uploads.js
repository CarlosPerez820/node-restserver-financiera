const {Router} = require('express');
const {check} = require('express-validator');

const{validarCampos} = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const prestamo = require('../models/prestamo');
const solicitud = require('../models/solicitud');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/:ruta/:subruta/:nombre', cargarArchivo);

router.put('/:id/:coleccion/:ruta/:subruta/:nombre/:opcion',[
    check('id','El Id debe de ser de mongoBD').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['parametros', 'prestamos', 'clientes'])),
    validarCampos
], actualizarImagen);

module.exports = router;