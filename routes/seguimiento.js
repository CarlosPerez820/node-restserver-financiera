const {Router} = require('express');

const {check} = require('express-validator');
const { seguimientoPost, 
    seguimientoFinancieraGet, 
    seguimientoGestorGet, 
    SeguimientosDiaGet} = require('../controllers/seguimiento');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:financiera', seguimientoFinancieraGet);

router.get('/:financiera/:encargado', seguimientoGestorGet);

router.get('/:financiera/:encargado/:fech',SeguimientosDiaGet);

router.post('/',[
    check('gestor','El gestor es obligatorio').not().isEmpty(),
    check('fecha','El fecha es obligatorio').not().isEmpty(),
    check('hora','El hora es obligatorio').not().isEmpty(),
    check('latitud','El latitud es obligatorio').not().isEmpty(),
    check('longitud','El longitud es obligatorio').not().isEmpty(),
    check('actividad','El actividad es obligatorio').not().isEmpty(),
    check('sucursal','El sucursal es obligatorio').not().isEmpty(),
    validarCampos
], seguimientoPost);

module.exports = router;