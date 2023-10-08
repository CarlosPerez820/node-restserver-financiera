const {Router} = require('express');
const {buscar, buscarClientes} = require('../controllers/buscar');

const router = Router();

router.get('/:termino', buscarClientes);

module.exports = router;