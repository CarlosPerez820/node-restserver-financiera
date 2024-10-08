const {Router} = require('express');
const {check} = require('express-validator');

const {
    GastosFinancieraGet,
    GastosDiaGet,
    GastosResponsableGet,
    GastoPost,
    GastoPut,
    GastoDelete,
    GastoEspecificoGet
                } = require('../controllers/gastos');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeGastoID } = require('../helpers/db-validators');

const router = Router();

router.get('/:financiera', GastosFinancieraGet);

router.get('/:financiera/:fechaInicio/:fechaFin', GastosDiaGet);

router.get('/responsable/:financiera/:usuario', GastosResponsableGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeGastoID),
        validarCampos
], GastoEspecificoGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeGastoID),
        validarCampos
], GastoPut);

router.post('/',[
        check('sucursal','La sucursal es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatorio').not().isEmpty(),
        check('monto','El monto es obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatorio').not().isEmpty(),
        check('metodo','El metodo es obligatorio').not().isEmpty(),
        check('categoria','La categoria es obligatorio').not().isEmpty(),
        check('responsable','El responsable es obligatorio').not().isEmpty(),
        validarCampos
], GastoPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeGastoID),
        validarCampos
], GastoDelete);


module.exports = router;