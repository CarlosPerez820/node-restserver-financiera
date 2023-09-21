const {Router} = require('express');
const {check} = require('express-validator');

const {gestoresGet,
        gestoresPut,
        gestoresPost,
        gestoresDelete,
        gestoresPatch,
        gestoresFinancieraGet,
        gestorEspecificoGet} = require('../controllers/gestor')

const { validarCampos } = require('../middlewares/validar-campos');
const { existeGestorID } = require('../helpers/db-validators');

const router = Router();

router.get('/', gestoresGet);

router.get('/:financiera', gestoresFinancieraGet);

router.get('/especifico/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeGestorID),
    validarCampos
], gestorEspecificoGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeGestorID),
    validarCampos
], gestoresPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('sucursal','La sucursal es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener mas 6 caracteres').isLength({min:6}),
    validarCampos
], gestoresPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeGestorID),
    validarCampos
], gestoresDelete);

router.patch('/', gestoresPatch);

module.exports = router ;