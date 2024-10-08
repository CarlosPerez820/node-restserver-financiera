const {Router} = require('express');
const {check} = require('express-validator');

const {
    dotacionDiaGet,
    dotacionResponsableGet,
    dotacionEspecificoGet,
    dotacionPost,
    dotacionPut,
    dotacionDelete,
    dotacionFinancieraGet
    } = require('../controllers/dotacion');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeDotacionID } = require('../helpers/db-validators');

const router = Router();

router.get('/:financiera', dotacionFinancieraGet);

router.get('/:financiera/:dia', dotacionDiaGet);

router.get('/responsable/:financiera/:usuario', dotacionResponsableGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeDotacionID),
        validarCampos
], dotacionEspecificoGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeDotacionID),
        validarCampos
], dotacionPut);

router.post('/',[
        check('sucursal','La sucursal es obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatorio').not().isEmpty(),
        check('gestor','El gestor es obligatorio').not().isEmpty(),
        check('monto','El monto es obligatorio').not().isEmpty(),
        validarCampos
], dotacionPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeDotacionID),
        validarCampos
], dotacionDelete);


module.exports = router;