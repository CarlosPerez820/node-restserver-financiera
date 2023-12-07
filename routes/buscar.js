const {Router} = require('express');
const {buscar, buscarClientes, buscarClientePorNumero} = require('../controllers/buscar');

const router = Router();

router.get('/:termino', buscarClientes);

router.get('/cliente/:termino', buscarClientePorNumero);

module.exports = router;