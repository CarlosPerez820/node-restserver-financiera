const {Router} = require('express');
const {check} = require('express-validator');

const {
        pagoGet,
        pagoPut,
        pagoPost,
        pagoDelete,
        pagoPatch,
        pagosEspecificoGet,
        pagosFinancieraGet,
        pagosDiaGet,
        pagosPrestamoGet} = require('../controllers/pago');

const { validarCampos } = require('../middlewares/validar-campos');
const { existePagoID } = require('../helpers/db-validators');

const router = Router();

router.get('/', pagoGet);

router.get('/:financiera', pagosFinancieraGet);

router.get('/:financiera/:fech', pagosDiaGet);

router.get('/prestamo/:financiera/:folio', pagosPrestamoGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePagoID),
        validarCampos
], pagosEspecificoGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePagoID),
        validarCampos
], pagoPut);

router.post('/',[
        check('nombreCliente','El nombre es obligatorio').not().isEmpty(),
        validarCampos
], pagoPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existePagoID),
        validarCampos
], pagoDelete);

router.patch('/', pagoPatch);

module.exports = router;