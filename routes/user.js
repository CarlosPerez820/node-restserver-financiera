const {Router} = require('express');
const {check} = require('express-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/user');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, correoDisponible, existeUsuarioID } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioID),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('sucursal','La sucursal es obligatoria').not().isEmpty(),
    check('correo','Correo no valido').isEmail(),
    check('correo').custom(correoDisponible),
    check('password','La contraseña debe tener mas 6 caracteres').isLength({min:6}),
    //check('rol','El rol no es valido').isIn(['MATRIZ_ROLE','SUCURSAL_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioID),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router ;