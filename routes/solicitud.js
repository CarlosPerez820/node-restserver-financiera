const {Router} = require('express');
const {check} = require('express-validator');

const {
        solicitudGet,
        solicitudPut,
        solicitudPost,
        solicitudDelete,
        solicitudPatch,
        solicitudFinancieraGet,
        solicitudValidosGet,
        solicitudEspecificoGet} = require('../controllers/solicitud');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeSolicitudID } = require('../helpers/db-validators');

const router = Router();

router.get('/', solicitudGet);

router.get('/:financiera', solicitudFinancieraGet);

router.get('/validos/:financiera', solicitudValidosGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeSolicitudID),
        validarCampos
], solicitudEspecificoGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeSolicitudID),
        validarCampos
], solicitudPut);

router.post('/',[
        check('fechaSolicitud','La fecha es obligatoria').not().isEmpty(),
        validarCampos
], solicitudPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeSolicitudID),
        validarCampos
], solicitudDelete);

router.patch('/', solicitudPatch);

module.exports = router;