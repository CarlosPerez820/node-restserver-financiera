const {Router} = require('express');
const {check} = require('express-validator');

const {
        parametroGet,
        parametroPut,
        parametroPost,
        parametroDelete,
        parametroPatch,
        parametroFinancieraGet} = require('../controllers/parametro');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeParametroID } = require('../helpers/db-validators');

const router = Router();

router.get('/', parametroGet);

router.get('/:financiera', parametroFinancieraGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeParametroID),
        validarCampos
], parametroPut);

router.post('/',[
        check('sucursal','El nombre de la sucursal es obligatorio').not().isEmpty(),
        validarCampos
], parametroPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeParametroID),
        validarCampos
], parametroDelete);

router.patch('/', parametroPatch);

module.exports = router;