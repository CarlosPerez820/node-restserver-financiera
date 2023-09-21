const {Router} = require('express');
const {check} = require('express-validator');

const {
        prestamoGet,
        prestamoPut,
        prestamoPost,
        prestamoDelete,
        prestamoPatch,
        prestamoFinancieraGet,
        prestamosValidosGet,
        prestamosClientesGet,
        prestamoEspecificoGet} = require('../controllers/prestamo');

const { validarCampos } = require('../middlewares/validar-campos');
const { existePrestamoID } = require('../helpers/db-validators');

const router = Router();

router.get('/', prestamoGet);

router.get('/:financiera', prestamoFinancieraGet);

router.get('/validos/:financiera', prestamosValidosGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePrestamoID),
        validarCampos
], prestamoEspecificoGet);

router.get('/:financiera/:cliente', prestamosClientesGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePrestamoID),
        validarCampos
], prestamoPut);

router.post('/',[
        check('sucursal','El nombre de la sucursal es obligatorio').not().isEmpty(),
        validarCampos
], prestamoPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePrestamoID),
        validarCampos
], prestamoDelete);

router.patch('/', prestamoPatch);

module.exports = router;