const {Router} = require('express');
const {check} = require('express-validator');

const {
        interesGet,
        interesPut,
        interesPost,
        interesDelete,
        interesPatch,
        interesFinancieraGet,
        interesEspecificoGet} = require('../controllers/interes');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeInteresID } = require('../helpers/db-validators');

const router = Router();

router.get('/', interesGet);

router.get('/:financiera', interesFinancieraGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeInteresID),
        validarCampos
], interesEspecificoGet);


router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeInteresID),
        validarCampos
], interesPut);

router.post('/',[
        check('sucursal','El sucursal es obligatorio').not().isEmpty(),
        check('limiteInferior','El limite inferior es obligatorio').not().isEmpty(),
        check('limiteSuperior','El limite superior es obligatorio').not().isEmpty(),
        check('porcentaje','El porcentaje es obligatorio').not().isEmpty(),
        validarCampos
], interesPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeInteresID),
        validarCampos
], interesDelete);

router.patch('/', interesPatch);

module.exports = router;