const {Router} = require('express');
const {check} = require('express-validator');

const {clientesGet,
        clientesPut,
        clientesPost,
        clientesDelete,
        clientesPatch,
        clientesFinancieraGet,
        clienteEspecificoGet,
        buroGet} = require('../controllers/cliente');

const {validarCampos} = require('../middlewares/validar-campos'); 
const {numeroClienteDisponible, existeClienteID} = require('../helpers/db-validators');

const router = Router();

router.get('/', clientesGet);

router.get('/buro', buroGet);

router.get('/:financiera', clientesFinancieraGet);

router.get('/especifico/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeClienteID),
        validarCampos
], clienteEspecificoGet);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeClienteID),
        validarCampos
],clientesPut);

router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('numeroCliente').custom(numeroClienteDisponible),
        validarCampos
], clientesPost);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeClienteID),
        validarCampos
],clientesDelete);

router.patch('/', clientesPatch);

module.exports = router; 