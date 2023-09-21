const {Router} = require('express');
const {check} = require('express-validator');
const { login, movil } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('password','La contrasena es obligatorio').not().isEmpty(),
    validarCampos
],login );

router.post('/movil',movil)

module.exports = router;